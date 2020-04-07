const User = require('../../models/userModel');
const jwttoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    createUser: async (args, req) => {
        try {
            let { name, password, email } = args;
            password = await bcrypt.hash(password, 12);
            const newUser = {
                name,
                email,
                password,
            };

            const user = await User.create(newUser);

            let token = jwttoken.sign(newUser, 'secretKey', { expiresIn: '1d'});

            if (!user) {
                throw new Error('Created user failed, please try again');
            }

            return {
                token, 
                message: 'User created successfully!'
            };
        } catch (error) {
            return {
                message: 'User created failed!'
            }; 
        }
    }
};