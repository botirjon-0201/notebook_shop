const User = require("../models/user");

const getProfile = async (req, res) => {
  res.render("profile", {
    title: "Profile",
    isProfile: true,
    user: req.user.toObject(),
  });
};

const editProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const toChange = {
      name: req.body.name,
    };
    if (req.file) {
      toChange.avatarUrl = req.file.path;
    }

    Object.assign(user, toChange);
    await user.save();
    res.redirect("/profile");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getProfile, editProfile };
