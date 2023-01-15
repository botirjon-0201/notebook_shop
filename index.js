const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const exphbs = require("express-handlebars");
const homeRoutes = require("./routes/home");
const notebooksRoutes = require("./routes/notebooks");
const addRoutes = require("./routes/add");
const cardRoutes = require("./routes/card");
const User = require("./models/user");

// app.engine(
//   "handlebars",
//   exphbs({
//     defaultLayout: "home",
//     handlebars: allowInsecurePrototypeAccess(Handlebars),
//   })
// );

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(async (req, res, next) => {
  try {
    const user = await User.findById("63c41394c8604b8daa2a9aa2");
    req.user = user;
    next()
  } catch (error) {
    console.log(error);
  }
});

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRoutes);
app.use("/notebooks", notebooksRoutes);
app.use("/add", addRoutes);
app.use("/card", cardRoutes);

async function start() {
  try {
    const MongoUrl =
      "mongodb+srv://Botirjon:4pNNd6dLX0qb8JFP@cluster0.a2mle2z.mongodb.net/shop_notebooks";
    mongoose.set("strictQuery", false);
    mongoose.connect(MongoUrl, { useNewUrlParser: true });
    const candidate = await User.findOne();
    if (!candidate) {
      const user = new User({
        email: "sam@sam.com",
        name: "Sam",
        cart: { items: [] },
      });
      await user.save();
    }

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
