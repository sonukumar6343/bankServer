const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = (req, res, next) => {
    const token = req.cookies.token;  // Extract token from cookies
    console.log("Token is:", token);

    if (!token) {
        return res.status(401).json({
            message: "Token not present"
        });
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // req.user = {
        //     ...decoded,   // Spread decoded token info (like userId, role, etc.)
        //     cookies: req.cookies // Attach full cookie data
        // };

        req.user = {
            id: decoded.userId,  // Assuming your token contains `id`
            role: decoded.role,
            cookies: req.cookies
        };
        if (req.user.role !== 'user') {
            return res.status(403).json({ message: 'Access denied' });
        }

        console.log("Decoded info:", req.user);
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};
