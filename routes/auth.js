const { Router } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const router = Router();

router.get("/login", async (req, res) => {
  res.render("auth/login", {
    title: "Register",
    isLogin: true,
  });
});

router.get("/logout", async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login#login");
  });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });

    if (candidate) {
      const samePas = bcrypt.compare(password, candidate.password);
      if (samePas) {
        req.session.user = candidate;
        req.session.isAuthenticated = true;
        req.session.save((err) => {
          if (err) throw err;
          res.redirect("/");
        });
      }
    } else {
      res.redirect("/auth/login#login");
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const candidate = await User.findOne({ email });

    if (candidate) {
      res.redirect("/auth/login#register");
    } else {
      const hashPass = await bcrypt.hash(password, 10);
      const user = new User({
        name,
        email,
        password: hashPass,
        cart: { items: [] },
      });
      await user.save();
      res.redirect("/auth/login#login");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;