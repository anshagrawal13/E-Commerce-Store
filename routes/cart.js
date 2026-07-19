const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");
const isLoggedIn = require("../middleware/isLoggedIn");

// View Cart
router.get("/", isLoggedIn, cartController.viewCart);

// Add Product
router.post("/add/:id", isLoggedIn, cartController.addToCart);

// Remove Product
router.delete("/remove/:id", isLoggedIn, cartController.removeFromCart);

// Increase Quantity
router.put("/increase/:id", isLoggedIn, cartController.increaseQuantity);

// Decrease Quantity
router.put("/decrease/:id", isLoggedIn, cartController.decreaseQuantity);

module.exports = router;