const jwt = require('jsonwebtoken');
const User = require('../database/models/user')

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed' });
    }
};

module.exports = authMiddleware;