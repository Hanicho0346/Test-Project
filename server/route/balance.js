const express = require('express');
const Balance = require('../Models/usebalance');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('../Models/User');
const router = express.Router();
const app = express();

app.use(cors());
app.use(express.json());

const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ error: message });
};

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return sendErrorResponse(res, 401, 'Token missing');

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return sendErrorResponse(res, 403, 'Invalid token');
    req.user = user;
    next();
  });
};


router.get('/:userId/balance', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) return sendErrorResponse(res, 404, 'User not found');

    const balanceRecord = await Balance.findOne({ userId });
    if (!balanceRecord) {
      return sendErrorResponse(
        res,
        404,
        'Balance record not found. Please initialize a balance first.'
      );
    }

    res.status(200).json({
      balance: balanceRecord.balance,
      withdraw: balanceRecord.withdraw,
      originalDeposit: balanceRecord.originalDeposit,
      userDetails: { username: user.username, email: user.email },
    });
  } catch (error) {
    sendErrorResponse(res, 500, `Failed to fetch balance: ${error.message}`);
  }
});


router.post('/:userId/balance', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const { balance } = req.body;

    if (!balance || typeof balance !== 'number' || balance <= 0) {
      return sendErrorResponse(res, 400, 'Invalid balance format. Must be a positive number.');
    }

    const user = await User.findById(userId);
    if (!user) return sendErrorResponse(res, 404, 'User not found');

    let balanceRecord = await Balance.findOne({ userId });
    if (balanceRecord) {
      balanceRecord.originalDeposit-=balanceRecord.withdraw;
      balanceRecord.originalDeposit+= balance; 
      balanceRecord.balance=balanceRecord.originalDeposit;
    } else {
      balanceRecord = new Balance({
        userId,
        balance,
        originalDeposit: balance,
        withdraw: 0,
      });
    }

    await balanceRecord.save();

    res.status(201).json({
      message: 'Balance updated successfully',
      updatedBalance: balanceRecord.balance,
      originalDeposit: balanceRecord.originalDeposit,
    });
  } catch (error) {
    sendErrorResponse(res, 500, `Failed to update balance: ${error.message}`);
  }
});

router.put('/:userId/balance', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const { totalWithdraw } = req.body;

    if (!totalWithdraw || typeof totalWithdraw !== 'number' || totalWithdraw <= 0) {
      return sendErrorResponse(res, 400, 'Invalid withdraw amount. Must be a positive number.');
    }

    const user = await User.findById(userId);
    if (!user) return sendErrorResponse(res, 404, 'User not found');

    let balanceRecord = await Balance.findOne({ userId });
    if (!balanceRecord) {
      return sendErrorResponse(res, 404, 'Balance record not found. Please add funds first.');
    }

    if ( balanceRecord.balance<=0) {
      return sendErrorResponse(res, 400, 'Insufficient balance for withdrawal.');
    }
    balanceRecord.balance=balanceRecord.originalDeposit;
    if (totalWithdraw){
      balanceRecord.balance -= totalWithdraw;
    }
    balanceRecord.withdraw = totalWithdraw;
    

    await balanceRecord.save();

    res.status(200).json({
      message: 'Withdrawal successful and balance updated!',
      updatedBalance: balanceRecord.balance,
      updatedWithdraw: balanceRecord.withdraw,
    });
  } catch (error) {
    sendErrorResponse(res, 500, `Failed to update balance: ${error.message}`);
  }
});

module.exports = router;
