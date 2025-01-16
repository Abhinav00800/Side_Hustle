const mongoose = require('mongoose');
const { Schema } = mongoose;

const Ondemand = new Schema({
    email: {
        type: String,
        required: true, // Removed unique constraint
    },
    CategoryName: {
        type: String,
        required: true,
    },
    pincode: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String, // Changed from URL to String
        required: true,
    },
    options: [
        {
            quantity: { type: String, required: true },
            price: { type: Number, required: true },
        }
    ],
    description: {
        type: String,
    }
});

module.exports = mongoose.model('Ondemand', Ondemand);
