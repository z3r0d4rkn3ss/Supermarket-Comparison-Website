// Basket schema to store user's basket

const mongoose = require('mongoose');

const basketSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});

module.exports = mongoose.model('Basket', basketSchema);
