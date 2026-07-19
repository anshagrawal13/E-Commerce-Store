const User = require("../models/User");


// ===========Show Register Page===============
exports.showRegister = (req, res) => {
    res.render("auth/register");
};


// =========== Register User===============
exports.registerUser = async (req, res) => {
    try {

        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            req.flash("error", "Email already registered.");
            return res.redirect("/ecom/auth/register");
        }

        // Create user
        const newUser = new User({
            username,
            email,
            password
        });

        await newUser.save();

        req.flash("success", "Registration Successful! Please Login.");

        res.redirect("/ecom/auth/login");

    } catch (err) {

        console.log(err);

        req.flash("error", "Something went wrong.");

        res.redirect("/ecom/auth/register");
    }
};


// ========== Show Login Page================
exports.showLogin = (req, res) => {
    res.render("auth/login");
};


// =========== Login User===============
exports.loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            req.flash("error", "Invalid Email or Password");
            return res.redirect("/ecom/auth/login");
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            req.flash("error", "Invalid Email or Password");
            return res.redirect("/ecom/auth/login");
        }

        // Store user in session
        req.session.user = {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        };
        console.log("Correct Password");
        console.log(req.session.user);
        req.flash("success", "Welcome " + user.username);

        res.redirect("/ecom/products");

    } catch (err) {

        console.log(err);

        req.flash("error", "Login Failed");

        res.redirect("/ecom/auth/login");
    }

};


// =========== Logout===============
exports.logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect("/");
        }

        res.clearCookie("connect.sid");
        res.redirect("/");
    });
};