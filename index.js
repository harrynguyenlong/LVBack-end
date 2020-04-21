'use strict';
require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');

const passport = require('passport');
require('./graphql/Authentication/passport');

const rootSchema = require('./graphql/schema');
const rootResolver = require('./graphql/resolvers');
const auth = require('./routes/authRoute');

const uploadRoute = require('./routes/uploadRoute');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(passport.initialize());
app.use(cors());

// handling image direction
app.use('/uploads/images', express.static(path.join('uploads', 'images')));

const checkAuth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
            req.isAuth = false;
            req.userId = undefined;
        } else {
            // console.log('NOT ERRORRRRR', user._id);
            req.isAuth = true;
            req.userId = user._id;
        }
        next();
    })(req, res);
};

// graphql
app.use('/auth', auth);

app.use('/upload-image', checkAuth, uploadRoute);

app.use(
    '/graphql',
    checkAuth,
    graphqlHTTP({
        schema: rootSchema,
        rootValue: rootResolver,
        graphiql: true,
    })
);

// start server
const PORT = process.env.PORT || 5000;
(async () => {
    try {
        await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });
        console.log('Database connected successfully');
        app.listen(PORT, () => {
            console.log('Server stated at port:', PORT);
        });
    } catch (error) {
        console.error('Database connection failed', error);
    }
})();
