const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  supermarket: { type: String, required: true },
  price: { type: Number, required: true },
  dateScraped: { type: Date, required: true },
});

module.exports = mongoose.model('Product', productSchema);
