const _ = require("lodash");
const { User } = require("../../models/user");

const ulist = async (req, res) => {
  let user = await User.find().select("-password");

  res.json({ success: true, data: user });
};

module.exports = ulist;
