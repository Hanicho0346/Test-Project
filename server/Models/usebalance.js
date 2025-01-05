const mongoose = require("mongoose");

const usebalance = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    balance: { type: Number, default: 0 },
    originalDeposit:{type: Number, default: 0 },
    withdraw:{type:Number,default:0}
});

const Balance = mongoose.model("Balance", usebalance);
module.exports = Balance;
