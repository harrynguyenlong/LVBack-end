'use strict';
require('dotenv').config();
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server is stated at port:', PORT);
});
