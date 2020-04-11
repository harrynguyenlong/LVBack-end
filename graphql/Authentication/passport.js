const passport = require('passport');
const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy   = passportJWT.Strategy;
const User = require('../../models/userModel');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function(email, password, callback) {
    let user = User.findOne({email}).then(user => {
        if (!user) {
            return callback(null, false, { message: 'Invalid email or password'});
        }
    
        let userPassword = user.password;
        
        bcrypt.compare(password, userPassword).then(isPasswordMatch => {
            if (isPasswordMatch) {
                return callback(null, user, {
                    message: 'Logged In successfully!'
                });
            } else {
                return  callback(null, false, { message: 'Invalid email or password'});
            }
        }).catch(error => {
            return callback(null, false, { message: 'Invalid email or password'});
        });
    }).catch(error => {
        return callback(null, false, { message: 'Invalid email or password'});
    });
}));

// passport.use(new JWTStrategy({
//     jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//     secretOrKey   : 'secretKey'
// },
// function (jwtPayload, callback) {

// }
// ));
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : 'secretKey'
},
function (jwtPayload, callback) {

    //find the user in db if needed
    return User.findOneById(jwtPayload.id)
    .then(user => {
        return callback(null, user);
    })
    .catch(err => {
        return callback(err);
    });
}
));