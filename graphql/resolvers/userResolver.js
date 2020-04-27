const User = require('../../models/userModel');
const jwttoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require('passport');

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

    updateUserInformation: async (args, req) => {
        try {
            if (!req.userId && !req.isAuth) {
                throw new Error('Unauthenticated');
            }

            const userId = req.userId;
            const newPassword = await bcrypt.hash(args.newPassword, 12);
            const email = args.email;
            const name = args.name;

            const updateParams = {
                password: newPassword,
                email: email,
                name: name
            };

            for(let prop in updateParams) {
                if (!updateParams[prop]) {
                    delete updateParams[prop];
                }
            };

            const user = await User.findByIdAndUpdate({_id: userId}, updateParams);
            const updatedUser = await User.findById({_id: userId});

            if (!updatedUser) {
                throw new Error('User not found');
            }

            return updatedUser;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
};
