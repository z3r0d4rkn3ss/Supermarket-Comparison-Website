const mongoose = require('mongoose');

const dbConfig = {
    development: 'mongodb://localhost:27017/supermarket_comparison',
    production: process.env.MONGODB_URI,  // Should be an environment variable in production
};

const connectDB = async () => {
    try {
        const dbURI = process.env.NODE_ENV === 'production' ? dbConfig.production : dbConfig.development;
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
