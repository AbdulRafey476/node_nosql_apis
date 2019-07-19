const { User } = require("../../models/user");
const ObjectId = require("mongoose").Types.ObjectId;

const verification = async (req, res) => {
  const { uid, token } = req.params;

  if (!ObjectId.isValid(uid))
    return res.status(400).send("Invalid token or expired");

  let user = await User.findById(uid).select("-password");

  if (user.verified)
    return res.status(200).send("You already verified your email");

  if (user.token !== token)
    return res.status(400).send("Invalid token or expired.");

  user.verified = true;
  user.validity = false;

  await user.save();

  res.send("Your email is verified");
};

module.exports = verification;
