const mongoose = require("mongoose");
const Product = require("../models/Product");
const products = require("./data");

mongoose
    .connect("mongodb://127.0.0.1:27017/ecommerce")
    .then(() => console.log("Database Connected"));

async function initDB() {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Products Inserted Successfully");
    mongoose.connection.close();
}

initDB();

