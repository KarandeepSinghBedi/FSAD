const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token;
    
    // Check for the token in the Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Get token from the header
            token = req.headers.authorization.split(" ")[1];

            // Decode the token and get the user ID
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user info to the request
            req.user = await User.findById(decoded.id).select("-password"); // Don't return password
            next();
        } catch (error) {
            res.status(401).json({ message: "Not authorized" });
        }
    }

    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};

module.exports = protect;
