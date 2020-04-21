'use strict';
const JWT = require('jsonwebtoken');

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

exports.login = async (req, res, next) => {
    const token = signToken(req.user);

    const userObj = {
        id: req.user._id,
        name: req.user.name,
        roles: req.user.roles,
        numberOfPosts: req.user.numberOfPosts,
        numberOfComments: req.user.numberOfComments,
        numberOfLikes: req.user.numberOfLikes,
        email: req.user.email,
    };

    res.status(200).json({
        status: 'login success',
        token,
        userObj,
    });
};
