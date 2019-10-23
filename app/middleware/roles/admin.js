const { User } = require("../../models/user");
const ObjectId = require("mongoose").Types.ObjectId;

const admin = async (req, res, next) => {
  const { _id } = req.user;

  if (!ObjectId.isValid(_id)) return res.status(400).json({ success: false, message: "Invalid token or expired" });

  const user = await User.findById(_id).select("-password");
  if (user.role !== "admin") return res.status(403).json({ success: false, message: "Only admin can access." });

  next();
};

module.exports = admin;
