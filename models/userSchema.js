const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const userSchema = new Schema({
  active: { type: Boolean, default: true },
  signup_date: Date,
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});
module.exports = mongoose.model('User', userSchema);
