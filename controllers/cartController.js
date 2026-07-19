const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Add Product To Cart
exports.addToCart = async (req, res) => {

    try {

        const userId = req.session.user.id;
        const productId = req.params.id;

        // Check if product exists
        const product = await Product.findById(productId);

        if (!product) {
            req.flash("error", "Product not found");
            return res.redirect("/ecom/products");
        }

        // Find user's cart
        let cart = await Cart.findOne({ user: userId });

        // If cart doesn't exist, create one
        if (!cart) {

            cart = new Cart({
                user: userId,
                items: [
                    {
                        product: productId,
                        quantity: 1
                    }
                ]
            });

        } else {

            // Check if product already exists in cart
            const itemIndex = cart.items.findIndex(item => {
                return item.product.toString() === productId;
            });

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += 1;
            } else {
                cart.items.push({
                    product: productId,
                    quantity: 1
                });
            }

        }

        await cart.save();

        req.flash("success", "Product added to cart");

        res.redirect("/ecom/cart");

    } catch (err) {

        console.log(err);

        req.flash("error", "Unable to add product");

        res.redirect("/ecom/products");

    }

};

//view Cart
exports.viewCart = async (req, res) => {

    const userId = req.session.user.id;

    const cart = await Cart.findOne({
        user: userId
    }).populate("items.product");

    res.render("cart/index", { cart });
};

// Increase Quantity

exports.increaseQuantity = async (req, res) => {

    const userId = req.session.user.id;
    const productId = req.params.id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        return res.redirect("/ecom/cart");
    }

    const item = cart.items.find(item =>
        item.product.toString() === productId
    );

    if (item) {
        item.quantity += 1;
    }

    await cart.save();

    req.flash("success", "Quantity Updated");

    res.redirect("/ecom/cart");
};

// Decrease Quantity

exports.decreaseQuantity = async (req, res) => {

    const userId = req.session.user.id;
    const productId = req.params.id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        return res.redirect("/ecom/cart");
    }

    const item = cart.items.find(item =>
        item.product.toString() === productId
    );

    if (item) {

        item.quantity--;

        if (item.quantity <= 0) {

            cart.items = cart.items.filter(item =>
                item.product.toString() !== productId
            );

        }

    }

    await cart.save();

    req.flash("success", "Quantity Updated");

    res.redirect("/ecom/cart");
};

//Remove 

exports.removeFromCart = async (req, res) => {

    const userId = req.session.user.id;
    const productId = req.params.id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        return res.redirect("/ecom/cart");
    }

    cart.items = cart.items.filter(item =>
        item.product.toString() !== productId
    );

    await cart.save();

    req.flash("success", "Product Removed");

    res.redirect("/ecom/cart");
};