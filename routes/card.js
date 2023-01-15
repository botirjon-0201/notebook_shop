const { Router } = require("express");
const Notebook = require("../models/notebook");
const router = Router();

function mapCart(cart) {
  return cart.items.map((item) => ({
    ...item.notebookId._doc,
    count: item.count,
  }));
}

function computePrice(notebooks) {
  return notebooks.reduce((total, notebook) => {
    return (total += notebook.price * notebook.count);
  }, 0);
}

router.post("/add", async (req, res) => {
  const notebook = await Notebook.findById(req.body.id);
  await req.user.addToCart(notebook);
  res.redirect("/card");
});

router.post("/inc/:id", async (req, res) => {
  const card = await Card.increment(req.params.id);
  res.status(200).send(card);
});

router.delete("/dec/:id", async (req, res) => {
  const card = await Card.decrement(req.params.id);
  res.status(200).send(card);
});

router.delete("/remove/:id", async (req, res) => {
  const card = await Card.remove(req.params.id);
  res.status(200).send(card);
});

router.get("/", async (req, res) => {
  const user = await req.user.populate("cart.items.notebookId");
  const notebooks = mapCart(user.cart);

  res.render("card", {
    title: "Basket",
    isCard: true,
    notebooks: notebooks,
    price: computePrice(notebooks),
  });
});

module.exports = router;
