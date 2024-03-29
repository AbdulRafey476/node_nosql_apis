const winston = require("winston");

const error = (err, req, res, next) => {
  winston.error(err.message, err);
  // console.error(err);
  res.status(500).json({ success: false, message: "Internal server error." });
};

module.exports = error;
