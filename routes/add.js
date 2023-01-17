const { Router } = require("express");
const Notebook = require("../models/notebook");
const router = Router();

router.get("/", (req, res) => {
  try {
    res.render("add", { title: "Add Notebook", isAdd: true });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const notebook = new Notebook({
      title: req.body.title,
      price: req.body.price,
      img: req.body.img,
      descr: req.body.descr,
      userId: req.user._id,
    });
    await notebook.save();
    res.redirect("/notebooks");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
