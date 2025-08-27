const jwt = require("jsonwebtoken");
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ message: "Authentication token required" }); // if there isn't any token
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res
                .status(403)
                .json({ message: "Invalid or Expired Token, Please SignIn Again" });
        }
        req.user = user;
        next(); // pass the execution off to whatever request the client intended
    });
};
module.exports = { authenticateToken };