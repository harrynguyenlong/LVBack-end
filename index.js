'use strict';
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const passport = require('passport');
const rootSchema = require('./graphql/schema');
const rootResolver = require('./graphql/resolvers');
const auth = require('./graphql/Authentication/auth');
const GraphQLLocalStrategy = require('graphql-passport').GraphQLLocalStrategy;
const buildContext = require('graphql-passport').buildContext;
const User = require('./models/userModel');
require('./graphql/Authentication/passport');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize())

// dummy authentication middleware
// app.use((req, res, next) => {
//     req.isAuth = true;
//     req.userId = '5e8b8d971c9d44000060ef0b'; // Long Nguyen
//     next();
// });

// graphql
app.use('/auth', auth);

app.use(
    '/graphql',
    graphqlHTTP({
        schema: rootSchema,
        rootValue: rootResolver,
        graphiql: true,
    }
    )
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
