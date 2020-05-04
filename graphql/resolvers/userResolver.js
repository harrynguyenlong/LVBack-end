const User = require('../../models/userModel');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');

const signToken = (user) => {
    return JWT.sign(
        {
            iss: 'iShare',
            sub: user._id,
            iat: new Date().getTime(), // current time
            exp: new Date().setDate(new Date().getDate() + 1), // current time + 1 day ahead
        },
        process.env.JWT_SECRET
    );
};

module.exports = {
    createUser: async (args, req) => {
        try {
            const { name, password, email } = args;

            // check email is exist
            const isEmailExist = await User.findOne({ email: email });

            console.log('email exist', isEmailExist);

            let resToken;

            // if email is NOT exist
            if (!isEmailExist) {
                const hashedPassword = await bcrypt.hash(password, 12);
                const newUser = {
                    name,
                    email,
                    password: hashedPassword,
                };

                const user = await User.create(newUser);

                if (!user) {
                    throw new Error('Created user failed, please try again');
                }

                const token = signToken(user);

                resToken = {
                    token,
                    userId: user._id,
                    message: 'Created user successfully',
                };
            } else {
                console.log('email is exist');
                resToken = {
                    token: '',
                    userId: '',
                    message: 'email already exists',
                };
            }

            return resToken;
        } catch (error) {
            return {
                message: 'User created failed!',
            };
        }
    },

    // get user by Id
    user: async (args, req) => {
        try {
            if (!req.userId && !req.isAuth) {
                throw new Error('Unauthenticated');
            }
            const userId = args.userId;

            const user = await User.findById(userId);

            if (!user) {
                throw new Error('User not found');
            }

            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    // edit user information: name, email, avatar
    editUserInfo: async (args, req) => {
        try {
            if (!req.userId && !req.isAuth) {
                throw new Error('Unauthenticated');
            }

            const user = await User.findById(req.userId);

            if (!user) {
                throw new Error('User not found');
            }

            let updatedUserData;

            if (args.avatarUrl === 'undefined' || !args.avatarUrl) {
                updatedUserData = {
                    name: args.name,
                    email: args.email,
                    avatarUrl: user.avatarUrl,
                };
            } else {
                updatedUserData = {
                    name: args.name,
                    email: args.email,
                    avatarUrl: args.avatarUrl,
                };
                if (user.avatarUrl) {
                    fs.unlink(user.avatarUrl, (err) => {
                        console.log(err);
                    });
                }
            }

            const updatedUser = await User.findByIdAndUpdate(req.userId, updatedUserData, {
                new: true,
            });

            return updatedUser;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    // edit user password
    editUserPassword: async (args, req) => {
        try {
            if (!req.userId && !req.isAuth) {
                throw new Error('Unauthenticated');
            }

            const user = await User.findById(req.userId);

            if (!user) {
                throw new Error('User not found');
            }

            const { oldPassword, newPassword } = args;

            const isMatch = await bcrypt.compare(oldPassword, user.password);

            let returnObj;

            if (isMatch === false) {
                returnObj = {
                    status: 'failed',
                    message: 'Old password is not correct',
                };
            } else {
                const hashedPassword = await bcrypt.hash(newPassword, 12);
                const updatedUser = await User.findByIdAndUpdate(req.userId, {
                    password: hashedPassword,
                });

                if (!updatedUser) {
                    throw new Error('Something went wrong while updating password');
                }
                returnObj = {
                    status: 'success',
                    message: 'Password updated successfully',
                };
            }

            return returnObj;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
};
