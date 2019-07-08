const verified = (req, res, next) => {
  if (!req.user.verified)
    return res.status(403).send("Please verified your email address");

  next();
};

module.exports = verified;
