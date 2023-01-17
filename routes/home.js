const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  try {
    res.render("index", { title: "Main page", isHome: true });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
