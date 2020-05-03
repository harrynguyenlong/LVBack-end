const User = require('../../models/userModel');
const jwttoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');

module.exports = {
    createUser: async (args, req) => {
        try {
            let { name, password, email } = args;
            password = await bcrypt.hash(password, 12);
            let newUser = {
                name,
                email,
                password,
            };

            const user = await User.create(newUser);

            newUser.id = user.id;

            let token = jwttoken.sign(newUser, 'secretKey', { expiresIn: '1d' });

            if (!user) {
                throw new Error('Created user failed, please try again');
            }

            return {
                token,
                message: 'User created successfully!',
            };
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
                fs.unlink(user.avatarUrl, (err) => {
                    console.log(err);
                });
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
