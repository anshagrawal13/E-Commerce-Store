const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");


// ===========Register=============

router.get("/register", authController.showRegister);
router.post("/register", authController.registerUser);

// ===========Login===============

router.get("/login", authController.showLogin);
router.post("/login", authController.loginUser);

// ===========Logout===============

router.get("/logout", authController.logoutUser);


module.exports = router;