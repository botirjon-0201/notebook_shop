const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.render("add", { title: "Add Notebook", isAdd: true });
});

module.exports = router;