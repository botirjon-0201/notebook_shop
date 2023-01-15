const { Router } = require("express");
const Order = require("../models/order");
const router = Router();

router.get("/", (req, res) => {
  try {
    res.render("orders", {
      isOrder: true,
      title: "Orders",
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await req.user.populate("cart.items.notebookId");
    const notebooks = user.cart.items.map((item) => ({
      count: item.count,
      notebook: { ...item.notebookId._doc },
    }));
    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user,
        notebooks,
      },
    });
    await order.save();
    await req.user.cleanCart();
    res.redirect("/orders");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
