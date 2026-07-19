require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

// Routes
const products = require("./routes/product");
const auth = require("./routes/auth");
const cart = require("./routes/cart");
const order = require("./routes/order");

const PORT = process.env.PORT || 3000;

// =======================
// Database Connection
// =======================
connectDB();

// =======================
// View Engine
// =======================
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// =======================
// Middlewares
// =======================
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(cookieParser());


// =======================
// Session Configuration
// =======================
const sessionOptions = {
    secret: process.env.SECRET || "mysupersecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
};

app.use(session(sessionOptions));
app.use(flash());

// =======================
// Global Variables
// =======================
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.session.user || null;
    next();
});

// =======================
// Routes
// =======================
app.get("/", (req, res) => {
    res.render("home"); // Create views/home.ejs
});

app.use("/ecom/products", products);
app.use("/ecom/auth", auth);
app.use("/ecom/cart", cart);
app.use("/ecom/order", order);

// =======================
// 404 Handler
// =======================
app.use((req, res) => {
    res.status(404).render("404"); // Create views/404.ejs
});

// =======================
// Start Server
// =======================
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});