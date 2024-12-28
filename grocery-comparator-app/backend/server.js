const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const priceComparisonRoutes = require('./routes/priceComparisonRoutes');
const basketRoutes = require('./routes/basketRoutes');
const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/compare_prices', priceComparisonRoutes);
app.use('/api/basket', basketRoutes);

mongoose.connect('mongodb://localhost/supermarket_comparison', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
  });
}).catch((error) => {
  console.log('Error connecting to the database', error);
});
