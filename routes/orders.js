const { Router } = require("express");
const Order = require("../models/order");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find({ "user.userId": req.user._id }).populate(
      "user.userId"
    );
    res.render("orders", {
      isOrder: true,
      title: "Orders",
      orders: orders.map((order) => ({
        ...order._doc,
        price: order.notebooks.reduce((total, item) => {
          return (total += item.count * item.notebook.price);
        }, 0),
      })),
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
      },
      notebooks,
    });
    await order.save();
    await req.user.cleanCart();
    res.redirect("/orders");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
