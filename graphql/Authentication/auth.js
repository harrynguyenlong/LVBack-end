const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/login', function (req, res, next) {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user: user,
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }

            console.log('backend user', user);
            let userObj = {
                id: user.id,
                email: user.email,
                name: user.name,
                avatarUrl: user.avatarUrl,
                numberOfPosts: user.numberOfPosts,
                numberOfComments: user.numberOfComments,
                numberOfLikes: user.numberOfLikes,
                roles: user.roles,
            };

            const token = jwt.sign(userObj, 'secretKey');
            return res.json({ userObj, token });
        });
    })(req, res);
});

module.exports = router;
