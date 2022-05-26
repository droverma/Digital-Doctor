const express = require("express");
const path = require("path");
const cors = require("cors");
const PORT = 3000;
const app = express();
app.use(express.static(path.join(__dirname, "build")));

app.use(cors());
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://127.0.0.1:${PORT}`);
});
