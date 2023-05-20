const mongoose = require("mongoose");
const { config } = require("../config/dotenv");

module.exports = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(config.db.uri(), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongDB.."))
    .catch((err) => console.error("Error connecting to MongDB...", err));
};
