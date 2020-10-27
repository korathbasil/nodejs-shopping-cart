const express = require("express");

// App config
const app = express();
const PORT = process.env.PORT || 8000;

// DB config

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

// Port listener
app.listen(PORT, () => {
  console.log("App running on port :" + PORT);
});
