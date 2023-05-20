const express = require("express");

module.exports = (app) => {
  app.use(express.json());
  app.use("/", require("../routes/home"));
  app.use("/auth", require("../routes/auth"));
  app.use("/add", require("../routes/add"));
  app.use("/cart", require("../routes/cart"));
  app.use("/notebooks", require("../routes/notebooks"));
  app.use("/orders", require("../routes/orders"));
  app.use("/profile", require("../routes/profile"));
  app.use(require("../middlewares/file").single("avatar"));
  app.use(require("../middlewares/auth"));
  app.use(require("../middlewares/user"));
  app.use(require("../middlewares/var"));
  app.use(require("../middlewares/error"));
};
