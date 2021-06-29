const mongoose = require('mongoose'),
  { Schema } = mongoose;

const paymentSchema = new Schema({
  name: String,
  active: { type: Boolean, default: true },
  amount: Number,
  date: Date,
  user: { type: Schema.Types.ObjectId, ref: 'User' },

  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Payment', paymentSchema);
