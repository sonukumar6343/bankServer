const BankAccount = require("../models/BankAccount");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
// dotenv.config();

exports.addBankAccount = async (req, res) => {
  try {
    
    const account = await BankAccount.create({
      ...req.body,
      user: req.user.id,
    });

    
    res.status(201).json(account);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBankAccounts = async (req, res) => {
  try {
    const accounts = await BankAccount.find({ user: req.user.id });
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Edit Bank Information
exports.editBankInfo = async (req, res) => {
    
  try {
    const { accountNumber, bankName, branchName, ifscCode,accountHolderName } = req.body;
    if (!accountNumber)
      return res.status(400).json({ message: "Account number is required" });
    
    const bankAccount=await BankAccount.findOne({accountNumber});
   
    if(!bankAccount){
        console.log("bankAccount not found")
    }


    const updatedBankInfo = await BankAccount.findOneAndUpdate(
      { accountNumber },
      { $set: { bankName, branchName, ifscCode,accountHolderName } },
      { new: true, runValidators: true }
    );

    if (!updatedBankInfo)
      return res.status(404).json({ message: "Bank account not found" });

    res
      .status(200)
      .json({ message: "Bank info updated successfully", updatedBankInfo });
  } catch (error) {
    console.error("Error updating bank info:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Remove Bank Information
exports.removeBankInfo = async (req, res) => {
  try {
    const { accountNumber } = req.body;
    if (!accountNumber)
      return res.status(400).json({ message: "Account number is required" });

    const deletedBank = await BankAccount.findOneAndDelete({ accountNumber });

    if (!deletedBank)
      return res.status(404).json({ message: "Bank account not found" });

    res
      .status(200)
      .json({ message: "Bank account removed successfully", deletedBank });
  } catch (error) {
    console.error("Error deleting bank info:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Get All Bank Accounts of a User (Multiple Accounts)
exports.getAllBankAccounts = async (req, res) => {
  try {
  const bankAccounts = await BankAccount.find({ userId: decoded.id });

    if (!bankAccounts.length)
      return res.status(404).json({ message: "No bank accounts found" });

    res
      .status(200)
      .json({ message: "Bank accounts retrieved successfully", bankAccounts });
  } catch (error) {
    console.error("Error fetching bank accounts:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
