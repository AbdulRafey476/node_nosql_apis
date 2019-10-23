const { User } = require("../models/user");
const ObjectId = require("mongoose").Types.ObjectId;

const verified = async (req, res, next) => {
  const { _id } = req.user;

  if (!ObjectId.isValid(_id)) return res.status(400).json({ success: false, message: "Invalid token or expired." });

  const user = await User.findById(_id).select("-password");
  if (!user.verified) return res.status(401).json({ success: false, message: "Please verify your email address." });

  next();
};

module.exports = verified;
