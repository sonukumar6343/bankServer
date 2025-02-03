const express = require('express');
const adminController = require("../controllers/AdminController")
const adminMiddleware = require('../middleware/adminMiddleware');
const router = express.Router();
router.get('/getAllBankAccount', adminMiddleware, adminController.getAllBankAccounts);
router.get('/search', adminMiddleware, adminController.search);
module.exports = router;