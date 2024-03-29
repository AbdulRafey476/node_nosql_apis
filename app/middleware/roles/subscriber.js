const { User } = require("../../models/user");
const ObjectId = require("mongoose").Types.ObjectId;

const subscriber = async (req, res, next) => {
  const { _id } = req.user;

  if (!ObjectId.isValid(_id)) return res.status(400).send({ success: false, message: "Invalid token or expired" });

  const user = await User.findById(_id).select("-password");
  if (user.role !== "subscriber" && user.role !== "admin") return res.status(403).send({ success: false, message: "Only subscriber can access." });

  next();
};

module.exports = subscriber;
