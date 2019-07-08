require('dotenv').config();
require('express-async-errors');

const winston = require('winston');
require('winston-mongodb');

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const error = require('./app/middleware/error')

winston.exceptions.handle(new winston.transports.File({ filename: 'uncaughtExceptions.log' }))

process.on('unhandleRejection', (ex) => {
    throw ex
})

winston.add(new winston.transports.File({ filename: 'logfile.log' }));

winston.add(new winston.transports.MongoDB({
    db: `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@ds345587.mlab.com:45587/${process.env.DATABASE}`,
    level: 'info'
}));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const api = require('./app/routes/api')
app.use('/api', api)

app.use(error)

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});
