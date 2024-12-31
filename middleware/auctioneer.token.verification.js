const jwt = require('jsonwebtoken');

const secretKey = process.env.AUCTIONEER_JWT_TOKEN; 

const verifyCustomerToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(403).send({ message: 'No token provided.' });
    }

    const token = authHeader.replace("Bearer ", "");

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(500).send({ message: 'Failed to authenticate token.' });
        }

        // If everything is good, save the decoded token to request for use in other routes
        req.auctioneer_id = decoded._id;
        next();
    });
};

module.exports = {verifyAuctioneerToken};