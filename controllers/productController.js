const Product = require("../models/Product");

exports.index = async (req, res) => {
    const products = await Product.find();
    res.render("products/index.ejs", { products });
};

exports.renderNewForm = (req, res) => {
    res.render("products/new.ejs");
};

exports.createProduct = async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.redirect("/ecom/products");
};

exports.showProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render("products/show.ejs", { product });
};

exports.renderEditForm = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render("products/edit.ejs", { product });
};

exports.updateProduct = async (req, res) => {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/ecom/products/${req.params.id}`);
};

exports.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/ecom/products");
};