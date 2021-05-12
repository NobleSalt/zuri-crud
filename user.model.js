const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  country: String,
});

exports.User = mongoose.model('User', UserSchema);
