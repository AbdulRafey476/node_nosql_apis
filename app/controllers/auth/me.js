const { User } = require('../../models/user');

const me = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.send(user)    
    } catch (ex) {
        next(ex)
    }
}

module.exports = me;