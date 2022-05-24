const express = require("express");
const bodyParser = require("body-parser");
const dbConfig = require("./config/database.config");
const { mongoose } = require("mongoose");
const cors = require("cors");

mongoose.Promise = global.Promise;

const PORT = 8080;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("successfully connected to the DB");
  })
  .catch((err) => {
    console.log("could not connect top DB");
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "welcometo nodejs slot apis" });
});

require("./app/routes/slot.routes")(app);
app.listen(PORT, () => {
  console.log(`Server is running on port http://127.0.0.1:${PORT}`);
});
