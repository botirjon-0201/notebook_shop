const express = require("express");
const app = express();
const { config } = require("./config/dotenv");
const path = require("path");
const flash = require("connect-flash");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const exphbs = require("express-handlebars");
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
  helpers: require("./utils"),
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});

const store = new MongoStore({
  connection: "sessions",
  uri: config.db.uri(),
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret val",
    resave: false,
    saveUninitialized: false,
    store,
  })
);
app.use(flash());

require("./start/routes")(app);
require("./start/db")();

async function start() {
  try {
    const PORT = config.server.port() || 5000;
    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
