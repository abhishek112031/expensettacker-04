const User = require('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const authenticate = async (req, res, next) => {
    const token = req.header('Authorization');
    const user = jwt.verify(token, process.env.SECRET_KEY);
    try {
        User.findByPk(user.userId)
            .then(user => {
                
                req.user = user;
                next();
            })
    }
    catch (err) {
        console.log(err);
        return res.status(401).json({ success: false });
    }
}

module.exports = authenticate;