const jwt = require('jsonwebtoken');
const config = require('./../config.json');

const auth = (req, res, next) => {
    if (config.active_auth) {
        const token = req.header('x-auth-token');

        if (!token)
            return res.status(401).send('Access denied. No token provided.');

        try {
            const decoded = jwt.verify(token, config.jwt_key);
            req.user = decoded;
            next();
        } catch (ex) {
            res.status(400).send('Invalid token.');
        }
    } else {
        next();
    }
};

module.exports = auth;
