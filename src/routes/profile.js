const { Router } = require("express");
const router = Router();
const authMiddleware = require("../middlewares/auth");
const {
  getProfile,
  editProfile,
} = require("../controllers/profile.controller");

router.get("/", authMiddleware, getProfile);

router.post("/", authMiddleware, editProfile);

module.exports = router;
