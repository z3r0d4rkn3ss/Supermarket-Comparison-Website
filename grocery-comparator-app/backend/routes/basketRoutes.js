const express = require('express');
const router = express.Router();
const { addToBasket } = require('../controllers/basketController');

router.post('/add_to_basket', addToBasket);

module.exports = router;
