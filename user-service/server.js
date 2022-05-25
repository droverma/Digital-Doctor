const express = require("express");
const bodyParser = require("body-parser");
const dbConfig = require("./config/database.config");
const { mongoose } = require("mongoose");
const cors = require("cors");
mongoose.Promise = global.Promise;
const PORT = 8085;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
mongoose
  .connect(dbConfig.url, { useNewUrlParser: true })
  .then(() => {
    console.log("successfully connected to the database...");
  })
  .catch((err) => {
    console.log("could not Connect with DB.");
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to User-Service APIs...." });
});

require("./app/routes/user.route.js")(app);
app.listen(PORT, () => {
  console.log(`Server is running on port http://127.0.0.1:${PORT}`);
});
