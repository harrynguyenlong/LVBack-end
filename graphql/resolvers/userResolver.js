const User = require('../../models/userModel');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require('passport');

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
            let { name, password, email } = args;
            password = await bcrypt.hash(password, 12);
            let newUser = {
                name,
                email,
                password,
            };

            const user = await User.create(newUser);

            console.log('USER', user);

            // newUser.id = user.id;

            const token = signToken(user);

            console.log('TOKEM', token);

            // let token = jwttoken.sign(newUser, 'secretKey', { expiresIn: '1d' });

            if (!user) {
                throw new Error('Created user failed, please try again');
            }

            console.log('USER IDDDDD', user._id);

            const RES_TOKEN = {
                token: token,
                userId: user._id,
            };

            console.log('RES TOKEN', RES_TOKEN);

            return RES_TOKEN;
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

    updateUserInformation: async (args, req) => {
        try {
            if (!req.userId && !req.isAuth) {
                throw new Error('Unauthenticated');
            }

            const userId = req.userId;
            const email = args.email;
            const name = args.name;

            const updateParams = {
                email: email,
                name: name,
            };

            for (let prop in updateParams) {
                if (!updateParams[prop]) {
                    delete updateParams[prop];
                }
            }

            const user = await User.findByIdAndUpdate({ _id: userId }, updateParams);
            const updatedUser = await User.findById({ _id: userId });

            if (!updatedUser) {
                throw new Error('User not found');
            }

            return updatedUser;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    updatePassword: async (args, req) => {
        try {
            if (!req.userId && !req.isAuth) {
                throw new Error('Unauthenticated');
            }

            const userId = req.userId;
            const hashedNewPassword = await bcrypt.hash(args.newPassword, 12);
            const oldPassword = args.oldPassword;

            const updateParams = {
                password: hashedNewPassword,
            };

            const user = await User.findById(userId);

            const isMatch = await bcrypt.compare(oldPassword, user.password);

            if (!isMatch) {
                throw new Error('Password does not match');
            } else {
                const updatedUser = await User.findByIdAndUpdate({ _id: userId }, updateParams);
                return updatedUser;
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
};
