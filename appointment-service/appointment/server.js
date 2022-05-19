const express = require("express");
const bodyParser = require("body-parser");
const dbConfig = require("./config/database.config");
const { mongoose } = require("mongoose");
const cors = require("cors");

const PORT = 8081;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

mongoose.Promise = global.Promise;
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
  res.json({ message: "welcometo nodejs apis" });
});

require("./app/routes/appointment.routes")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port http://127.0.0.1:${PORT}`);
});
