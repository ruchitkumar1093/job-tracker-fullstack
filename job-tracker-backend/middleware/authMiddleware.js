const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "secretkey"
        );

        req.user = decoded; // attach user id to request
        next();

    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};