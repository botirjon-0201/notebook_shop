const { Router } = require("express");
const authMiddleware = require("../middlewares/auth");
const { getOrders, createOrder } = require("../controllers/orders.controller");
const router = Router();

router.get("/", authMiddleware, getOrders);

router.post("/", authMiddleware, createOrder);

module.exports = router;
