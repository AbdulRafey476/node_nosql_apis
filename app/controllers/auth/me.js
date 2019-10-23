const { User } = require("../../models/user");
const ObjectId = require("mongoose").Types.ObjectId;

const me = async (req, res) => {
  if (!ObjectId.isValid(req.user._id)) return res.status(400).json({ success: false, message: "Invalid token or expired" });

  let user = await User.findById(req.user._id).select("-password -token -validity -role -verified");

  res.json({ success: true, body: user });
};

module.exports = me;
