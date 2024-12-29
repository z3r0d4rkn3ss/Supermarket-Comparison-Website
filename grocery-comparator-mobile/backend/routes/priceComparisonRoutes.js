const express = require('express');
const router = express.Router();
const { comparePrices } = require('../controllers/priceComparisonController');

router.post('/compare_prices', comparePrices);

module.exports = router;
