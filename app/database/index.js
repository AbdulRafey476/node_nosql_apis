const mongoose = require("mongoose");

mongoose.connect(
    `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@ds345587.mlab.com:45587/${process.env.DATABASE}`,
    { useNewUrlParser: true },
    err => {
        if (err) console.log(err);
        console.log("Successfully connected to Database");
    }
);

mongoose.set('useCreateIndex', true);

module.exports = mongoose
