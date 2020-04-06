const User = require('../../models/userModel');

module.exports = {
    createUser: async (args, req) => {
        try {
            const { name, password, email } = args;
            const newUser = {
                name,
                email,
                password,
            };

            const user = await User.create(newUser);

            console.log(user);

            if (!user) {
                throw new Error('Created user failed, please try again');
            }

            return user;
        } catch (error) {
            console.log(error);
        }
    }
};