const { Router } = require("express");
const authMiddleware = require("../middlewares/auth");
const {
  getNotebooks,
  editByIdNotebook,
  editNotebook,
  deleteNotebook,
  getNotebook,
} = require("../controllers/notebooks.controller");
const router = Router();

router.get("/", getNotebooks);
router.get("/:id/edit", authMiddleware, editByIdNotebook);
router.post("/edit", authMiddleware, editNotebook);
router.post("/remove", authMiddleware, deleteNotebook);
router.get("/:id", getNotebook);

module.exports = router;
