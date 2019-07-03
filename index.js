require('dotenv').config();
require('express-async-errors');

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const error = require('./app/middleware/error')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const api = require('./app/routes/api')
app.use('/api', api)

app.use(error)

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});
