const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.register = async (req, res) => {
  
  const { username, email, password } = req.body;

 

  try {
    const user = await User.create({ username, email, password });
    
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.login = async (req, res) => {
 
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ 
        userId: user._id,  
        role: user.role,   

    }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    

    return res.cookie("token", token, {
      httpOnly: true,
       secure: true,
       sameSite: "None",
    }).json({ message: "Login successful" ,token,role:user.role});;
    
   
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
