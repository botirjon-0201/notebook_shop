const { Router } = require("express");
const Notebook = require("../models/notebook");
const router = Router();

router.get("/", async (req, res) => {
  const notebooks = await Notebook.getAll();
  res.render("notebooks", { title: "Notebooks", isNotebooks: true, notebooks });
});

router.get("/:id", async (req, res) => {
  const notebook = await Notebook.getById(req.params.id);
  res.render("notebook", {
    layout: "detail",
    title: `Notebook ${notebook.title}`,
    notebook,
  });
});

module.exports = router;
