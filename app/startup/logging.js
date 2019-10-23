require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");

const logging = () => {
  winston.exceptions.handle(
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  process.on("unhandleRejection", ex => {
    throw ex;
  });

  winston.add(new winston.transports.File({ filename: "logfile.log" }));

  winston.add(
    new winston.transports.MongoDB({
      db: `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@ds345587.mlab.com:45587/${process.env.DATABASE}`,
      level: "info"
    })
  );
};

module.exports = logging;
