const mongoose = require('mongoose');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const Basket = require('../models/basketModel');

const seedData = async () => {
    const user = await User.create({ email: 'testuser@example.com', password: 'testpassword123' });

    const products = [
        { name: 'Apples', price: 2.5, supermarket: 'Tesco' },
        { name: 'Bananas', price: 1.8, supermarket: 'ASDA' },
    ];

    await Product.insertMany(products);

    const basket = await Basket.create({
        userId: user._id,
        items: [
            { productId: 'productId1', quantity: 3 },
            { productId: 'productId2', quantity: 2 },
        ],
    });

    console.log('Database seeded!');
    mongoose.connection.close();
};

module.exports = seedData;
