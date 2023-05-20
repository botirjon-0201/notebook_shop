const { Router } = require("express");
const {
  getLogin,
  logout,
  login,
  register,
} = require("../controllers/auth.controller");
const { registerValidators } = require("../utils/validator");
const router = Router();

router.get("/login", getLogin);
router.post("/register", registerValidators, register);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
