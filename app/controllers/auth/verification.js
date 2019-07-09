const { User } = require("../../models/user");

const verification = async (req, res) => {
  const { uid, token } = req.params;

  try {
    var user = await User.findById(uid).select("-password");
  } catch (ex) {
    return res.status(400).send("Invalid token or expired.");
  }

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
