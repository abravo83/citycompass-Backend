const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", require("./routes/api.routes"));

// Serve static files
app.use(express.static(path.join(__dirname, "../Public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Public/index.html"));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json(err);
});

module.exports = app;
