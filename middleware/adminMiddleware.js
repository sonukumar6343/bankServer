const jwt = require('jsonwebtoken');
const dotenv= require("dotenv");

dotenv.config();

module.exports = (req, res, next) => {
    
    const token = req.cookies.token;
  

    if (!token) {
        return res.status(401).json({ 
            message: 'No token provided' });
    }

    try {
       
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
       
          
        req.user = decoded; 
        
        console.log("req.user.role is:",req.user.role)

        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        next();
    } catch (error) {
        return res.status(401).json({ 
            message:error.message
         });
    }
};
