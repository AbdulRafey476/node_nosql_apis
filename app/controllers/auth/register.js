const bcrypt = require('bcrypt');
const Joi = require('joi');
const _ = require('lodash');
const { User } = require('../../models/user');

const register = async (req, res) => {
    const { name, email, password } = req.body;

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findne({ email });
    if (user) return res.status(400).send('User already registered.');

    user = new User({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)
    await user.save();

    const token = user.generateAuthToken()
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']))
}

const validate = (req) => {
    const Schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        password_confirmation: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } })
    };

    return Joi.validate(req, Schema);
}

module.exports = register;