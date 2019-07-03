const bcrypt = require('bcrypt');
const Joi = require('joi');
const { User } = require('../../models/user');

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email });
        if (!user) return res.status(400).send('Invalid email or password.');

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send('Invalid email or password.');

        const token = user.generateAuthToken()
        res.send(token)
    } catch (ex) {
        next(ex)
    }
}

const validate = (req) => {
    const Schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    };

    return Joi.validate(req, Schema);
}

module.exports = login;