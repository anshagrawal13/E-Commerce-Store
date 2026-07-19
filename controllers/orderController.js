const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Checkout
exports.checkout = async (req, res) => {

    try {

        const userId = req.session.user.id;

        const cart = await Cart.findOne({ user: userId })
            .populate("items.product");

        if (!cart || cart.items.length === 0) {

            req.flash("error", "Your cart is empty.");

            return res.redirect("/ecom/cart");
        }

        let totalAmount = 0;

        const orderItems = [];

        for (let item of cart.items) {

            // Optional stock check
            if (item.product.stock < item.quantity) {

                req.flash(
                    "error",
                    `${item.product.title} has only ${item.product.stock} item(s) left.`
                );

                return res.redirect("/ecom/cart");
            }

            orderItems.push({
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price
            });

            totalAmount += item.product.price * item.quantity;

            // Reduce stock
            item.product.stock -= item.quantity;

            await item.product.save();
        }

        // Create Order
        const order = new Order({

            user: userId,

            items: orderItems,

            totalAmount

        });

        await order.save();

        // Empty Cart
        cart.items = [];

        await cart.save();

        req.flash("success", "Order placed successfully!");

        res.redirect("/ecom/order");

    } catch (err) {

        console.log(err);

        req.flash("error", "Checkout failed.");

        res.redirect("/ecom/cart");
    }

};

// Order History
exports.orderHistory = async (req, res) => {

    try {

        const userId = req.session.user.id;

        const orders = await Order.find({ user: userId })
            .populate("items.product")
            .sort({ createdAt: -1 });

        res.render("orders/index", { orders });

    } catch (err) {

        console.log(err);

        req.flash("error", "Unable to fetch orders.");

        res.redirect("/ecom/products");
    }

};