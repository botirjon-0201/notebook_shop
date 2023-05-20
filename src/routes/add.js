const { Router } = require("express");
const authMiddleware = require("../middlewares/auth");
const { notebookValidators } = require("../utils/validator");
const { getAdd, postAdd } = require("../controllers/add.controller");
const router = Router();

router.get("/", authMiddleware, getAdd);
router.post("/", authMiddleware, notebookValidators, postAdd);

module.exports = router;
