const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  invoice_date: {
    type: Date,
    default: Date.now
  },
  total_amount: {
    type: Number,
    required: true
  },
  amount_paid: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Open', 'Paid', 'Partially Paid', 'Cancelled'],
    default: 'Open'
  }
});

const Billing = mongoose.model('Billing', billingSchema);
module.exports = Billing;
