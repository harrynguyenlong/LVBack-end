const express = require('express');
const passport = require('passport');

const auth = require('../graphql/Authentication/auth');

const router = express.Router();

router.route('/login').post(passport.authenticate('local', { session: false }), auth.login);

module.exports = router;
