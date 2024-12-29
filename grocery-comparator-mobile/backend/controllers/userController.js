const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming a User model is already created with mongoose

// Sign up
exports.signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Error creating user' });
    }
};

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ error: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).send({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, 'SECRET_KEY', { expiresIn: '1h' });
    res.status(200).send({ token });
};

// Get Basket
exports.getBasket = async (req, res) => {
    const userId = req.userId; // Assume we use middleware to decode the JWT and get userId
    const user = await User.findById(userId);
    res.status(200).send({ basket: user.basket });
};

// Add to Basket
exports.addToBasket = async (req, res) => {
    const userId = req.userId;
    const { productId, quantity } = req.body;

    const user = await User.findById(userId);
    user.basket.push({ productId, quantity });
    await user.save();

    res.status(200).send({ message: 'Product added to basket' });
};

// Update Basket
exports.updateBasket = async (req, res) => {
    const userId = req.userId;
    const { productId, quantity } = req.body;

    const user = await User.findById(userId);
    const itemIndex = user.basket.findIndex(item => item.productId === productId);
    if (itemIndex > -1) {
        user.basket[itemIndex].quantity = quantity;
    }
    await user.save();

    res.status(200).send({ message: 'Basket updated' });
};

// Remove from Basket
exports.removeFromBasket = async (req, res) => {
    const userId = req.userId;
    const { productId } = req.body;

    const user = await User.findById(userId);
    user.basket = user.basket.filter(item => item.productId !== productId);
    await user.save();

    res.status(200).send({ message: 'Product removed from basket' });
};
