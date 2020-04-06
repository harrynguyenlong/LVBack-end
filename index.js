'use strict';
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');

const rootSchema = require('./graphql/schema');
const rootResolver = require('./graphql/resolvers');
const auth = require('./Authentication/auth');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// dummy authentication middleware
app.use((req, res, next) => {
    req.isAuth = true;
    req.userId = '5e8b8d971c9d44000060ef0b'; // Long Nguyen
    next();
});

// graphql
app.use(
    '/graphql',
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
