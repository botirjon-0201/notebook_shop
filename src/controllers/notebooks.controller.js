const Notebook = require("../models/notebook");

const getNotebooks = async (req, res) => {
  try {
    const notebooks = await Notebook.find()
      .populate("userId", "email name")
      .select("price title img descr");
    res.render("notebooks", {
      title: "Notebooks",
      isNotebooks: true,
      userId: req.user ? req.user._id.toString() : null,
      notebooks,
    });
  } catch (error) {
    console.log(error);
  }
};

const editByIdNotebook = async (req, res) => {
  if (!req.query.allow) {
    return res.redirect("/");
  } else {
    try {
      const notebook = await Notebook.findById(req.params.id);
      if (notebook.userId.toString() !== req.user._id.toString()) {
        return res.redirect("/notebooks");
      }
      res.render("notebook-edit", {
        title: `Edit ${notebook.title}`,
        notebook,
      });
    } catch (error) {
      console.log(error);
    }
  }
};

const editNotebook = async (req, res) => {
  try {
    await Notebook.findByIdAndUpdate(req.body.id, req.body);
    res.redirect("/notebooks");
  } catch (error) {
    console.log(error);
  }
};

const deleteNotebook = async (req, res) => {
  try {
    await Notebook.deleteOne({ _id: req.body.id });
    res.redirect("/notebooks");
  } catch (error) {
    console.log(error);
  }
};

const getNotebook = async (req, res) => {
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
};

module.exports = {
  getNotebooks,
  getNotebook,
  editNotebook,
  editByIdNotebook,
  deleteNotebook,
};
