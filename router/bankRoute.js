const express = require('express');
const bankController = require("../controllers/BankController")
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
router.post('/addBankAccount', authMiddleware, bankController.addBankAccount);
router.get('/getBankAccount', authMiddleware, bankController.getBankAccounts);
router.post('/editBankInfo',authMiddleware,bankController.editBankInfo)
router.delete("/removeBankInfo",authMiddleware,bankController.removeBankInfo)
router.get("/getAllBankAccounts",authMiddleware,bankController.getAllBankAccounts)
module.exports = router;