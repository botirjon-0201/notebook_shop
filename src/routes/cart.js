const { Router } = require("express");
const authMiddleware = require("../middlewares/auth");
const {
  addToCart,
  deleteFromCart,
  incrementCart,
  decrementCart,
  getAllCarts,
} = require("../controllers/cart.controller");
const router = Router();

router.post("/add", authMiddleware, addToCart);
router.delete("/remove/:id", authMiddleware, deleteFromCart);
router.post("/inc/:id", authMiddleware, incrementCart);
router.delete("/dec/:id", authMiddleware, decrementCart);
router.get("/", authMiddleware, getAllCarts);

module.exports = router;
