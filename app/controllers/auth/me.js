const { User } = require("../../models/user");

const me = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
};

module.exports = me;
