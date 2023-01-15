const { Router } = require("express");
const Card = require("../models/card");
const Notebook = require("../models/notebook");
const router = Router();

router.post("/add", async (req, res) => {
  const notebook = await Notebook.getById(req.body.id);
  await Card.add(notebook);
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
  const card = await Card.fetch();
  res.render("card", {
    title: "Basket",
    isCard: true,
    notebooks: card.notebooks,
    price: card.price,
  });
});

module.exports = router;
