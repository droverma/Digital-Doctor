const express = require("express");
const bodyParser = require("body-parser");

const PORT = 8082;
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const route = express.Router();

require("./app/routes/email.routes")(app);

app.get("/", (req, res) => {
  res.json({ message: "welcometo nodejs apis" });
});


app.listen(PORT, () => {
  console.log(`Server is running on port http://127.0.0.1:${PORT}`);
});