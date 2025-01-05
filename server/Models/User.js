const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: [true, 'First name is required'] },
  lastName: { type: String, required: [true, 'Last name is required'] },
  email: { 
    type: String, 
    required: [true, 'Email is required'], 
    unique: true, 
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
    validate: [validator.isEmail, 'Please enter a valid email address'] 
  },
  password: { type: String, required: [true, 'Password is required'] },
  createdAt: { type: Date, default: Date.now },
});
const User = mongoose.model('User', userSchema);

module.exports = User;