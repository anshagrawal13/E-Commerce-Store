const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");
const isLoggedIn = require("../middleware/isLoggedIn");

// Checkout
router.post("/checkout", isLoggedIn, orderController.checkout);

// Order History
router.get("/", isLoggedIn, orderController.orderHistory);

module.exports = router;