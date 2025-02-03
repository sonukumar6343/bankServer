const BankAccount= require("../models/BankAccount");
const User = require("../models/User");
exports.getAllBankAccounts = async (req, res) => {
    try {
        console.log("admin andar aa gya")
        const accounts = await BankAccount.find().populate('user', 'username email');
        res.json(accounts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.search = async (req, res) => {
    try {
      const { query } = req.query; // Query parameter to search for user or bank account details
      if (!query) {
        return res.status(400).json({ message: "Query parameter is required" });
      }
  
      // Search for users (by username or email)
      const users = await User.find({
        $or: [
          { username: { $regex: query, $options: "i" } },
          { email: { $regex: query, $options: "i" } }
        ]
      });
  
      // Search for bank accounts (by bankName, accountNumber, or accountHolderName)
      const bankAccounts = await BankAccount.find({
        $or: [
          { bankName: { $regex: query, $options: "i" } },
          { accountNumber: { $regex: query, $options: "i" } },
          { accountHolderName: { $regex: query, $options: "i" } }
        ]
      }).populate('user', 'username email'); // Optionally populate user details for bank accounts
  
      // If no users or bank accounts are found
      if (users.length === 0 && bankAccounts.length === 0) {
        return res.status(404).json({ message: "No users or bank accounts found matching the search query" });
      }
  
      // Return both users and bank accounts in the response
      res.status(200).json({
        users,
        bankAccounts
      });
    } catch (error) {
      console.error("Error searching users and bank accounts:", error);
      res.status(500).json({ error: error.message });
    }
  };