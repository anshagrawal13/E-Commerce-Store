const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    image: {
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
        },

        filename: {
            type: String,
            default: "default"
        }
    },

    category: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    stock: {
        type: Number,
        default: 0
    }
}
);

module.exports = mongoose.model("Product", productSchema);