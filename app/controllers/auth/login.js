const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User } = require("../../models/user");

const login = async (req, res) => {
  const { email, password } = req.body;

  const { error } = validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });

  let user = await User.findOne({ email });
  if (!user) return res.status(400).json({ success: false, message: "Invalid email or password." });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ success: false, message: "Invalid email or password." });

  if (!user.verified) return res.status(400).json({ success: false, message: "Please verify your email address." });

  const authToken = user.generateAuthToken();
  res.json({ success: true, token: authToken });
};

const validate = req => {
  const Schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(req, Schema);
};

module.exports = login;
