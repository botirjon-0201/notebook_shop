const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const User = require("../models/user");

const getLogin = async (req, res) => {
  res.render("auth/login", {
    title: "Register",
    isLogin: true,
    registerError: req.flash("registerError"),
    loginError: req.flash("loginError"),
  });
};

const register = async (req, res) => {
  try {
    const { email, password, name, confirm } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("registerError", errors.array()[0].msg);
      return res.status(422).redirect("/auth/login#register");
    }
    const hashPass = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashPass,
      cart: { items: [] },
    });
    await user.save();
    res.redirect("/auth/login#login");
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
      const samePas = await bcrypt.compare(password, candidate.password);
      if (samePas) {
        req.session.user = candidate;
        req.session.isAuthenticated = true;
        req.session.save((err) => {
          if (err) throw err;
          res.redirect("/");
        });
      } else {
        req.flash("loginError", "Password wrong");
        res.redirect("/auth/login#login");
      }
    } else {
      req.flash("loginError", "This username does not found!");
      res.redirect("/auth/login#login");
    }
  } catch (error) {
    console.log(error);
  }
};

const logout = async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login#login");
  });
};

module.exports = { getLogin, register, login, logout };
