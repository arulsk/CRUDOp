const mongoose = require('mongoose');

const main = async () => {
    try {
        await mongoose.connect('mongodb://localhost/workersDetails');
        console.log('Connected to MongoDB database');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};

module.exports = main
