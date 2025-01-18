const jwt = require('jsonwebtoken');

const secretKey = process.env.CUSTOMER_JWT_TOKEN; 

const verifyCustomerToken = (req, res, next) => {
    const token = req.cookies['customer_token'];  

    if (!token) {
        return res.status(403).send({ message: 'No token provided.' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(500).send({ message: 'Failed to authenticate token.' });
        }

        req.customer_id = decoded._id;  
        next();
    });
};

module.exports = {verifyCustomerToken};
