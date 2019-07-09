const { User } = require("../../models/user");

const admin = async (req, res, next) => {
  const { _id } = req.user;
  if (!_id) return res.status(400).send("Invalid token or expired.");

  const user = await User.findById(_id).select("-password");
  if (user.role !== "admin") return res.status(403).send("Protected route by admin.");

  next();
};

module.exports = admin;
