const { Router } = require("express");
const Notebook = require("../models/notebook");
const authMiddleware = require("../middlewares/auth");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const notebooks = await Notebook.find()
      .populate("userId", "email name")
      .select("price title img descr");
    res.render("notebooks", {
      title: "Notebooks",
      isNotebooks: true,
      notebooks,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id/edit", authMiddleware, async (req, res) => {
  if (!req.query.allow) {
    return res.redirect("/");
  } else {
    try {
      const notebook = await Notebook.findById(req.params.id);
      res.render("notebook-edit", {
        title: `Edit ${notebook.title}`,
        notebook,
      });
    } catch (error) {
      console.log(error);
    }
  }
});

router.post("/edit", authMiddleware, async (req, res) => {
  try {
    await Notebook.findByIdAndUpdate(req.body.id, req.body);
    res.redirect("/notebooks");
  } catch (error) {
    console.log(error);
  }
});

router.post("/remove", authMiddleware, async (req, res) => {
  try {
    await Notebook.deleteOne({ _id: req.body.id });
    res.redirect("/notebooks");
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const notebook = await Notebook.findById(req.params.id);
    res.render("notebook", {
      layout: "detail",
      title: `Notebook ${notebook.title}`,
      notebook,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
