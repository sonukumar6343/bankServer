const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bankAccountSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ifscCode: { type: String, required: true },
    branchName: { type: String, required: true },
    bankName: { type: String, required: true },
    accountNumber: { type: String, required: true ,unique:true},
    accountHolderName: { type: String, required: true },
});

module.exports = mongoose.model('BankAccount', bankAccountSchema);
