const isLoggedIn = (req, res, next) => {

    if (!req.session.user) {

        req.flash("error", "Please login first.");

        return res.redirect("/ecom/auth/login");
    }

    next();
};

module.exports = isLoggedIn;