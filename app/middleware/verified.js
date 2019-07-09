const { User } = require("../models/user");

const verified = async (req, res, next) => {
  const { _id } = req.user;
  if (!_id) return res.status(400).send("Invalid token or expired.");

  try {
    const user = await User.findById(_id).select("-password");
    if (!user.verified)
      return res.status(400).send("Please verify your email address.");
  } catch (ex) {
    return res.status(400).send("Invalid token or expired.");
  }

  next();
};

module.exports = verified;
