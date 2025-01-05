const express = require('express');
const User = require('../Models/User');
const Transaction = require('../Models/Transaction');
const jwt = require('jsonwebtoken');
const cors = require("cors");
const Balance = require('../Models/usebalance');

const router = express.Router();
const app = express();
app.use(cors());
app.use(express.json());
router.get('/:userId/transactions', async (req, res) => {
  const { userId } = req.params;
  try {
    const transactions = await Transaction.find({ userId });

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ error: 'No transactions found for this user' });
    }

    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve transactions', details: error.message });
  }
});

router.post('/:userId/transactions', async (req, res) => {
  const { userId } = req.params;
  const { description, amount, category, date } = req.body;

  try {
    const newTransaction = new Transaction({
      userId,
      description,
      amount,
      category,
      date,
    });
    const balance = await Balance.find({ userId });
    if(balance.balance<=0){
      return res.status(404).json({ error: '=please deposite amount first' });
    }
    await newTransaction.save();
    res.status(201).json({ message: 'Transaction added successfully', transaction: newTransaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add transaction', details: error.message });
  }
});



module.exports = router;
