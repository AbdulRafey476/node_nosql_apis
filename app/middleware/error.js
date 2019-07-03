const error = (err, req, res, next) => {
    console.error(err);
    res.status(500).send('Internal server error.')        
}

module.exports = error;