const jwt = require('jsonwebtoken');

const secretKey = process.env.ADMIN_JWT_TOKEN;

const verifyAdminToken = (req, res, next) => {
    const token = req.cookies['admin_token'];  

    if (!token) {
        return res.status(403).send({ message: 'No token provided.' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(500).send({ message: 'Failed to authenticate token.' });
        }

        // If everything is good, save the decoded token to request for use in other routes
        req.admin_id = decoded._id;  // Store admin ID in the request
        next();
    });
};

module.exports = {verifyAdminToken};
