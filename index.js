// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes= require('./router/authRoute');
const bankRoutes = require('./router/bankRoute');
const adminRoutes = require('./router/adminRoute');
const adminMiddleware = require('./middleware/adminMiddleware');
const authMiddleware=require("./middleware/authMiddleware");
const cookieParser = require('cookie-parser');



dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL, // allow your frontend's origin
    credentials:true
  }));
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/bank', bankRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
