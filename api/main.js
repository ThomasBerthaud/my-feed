const express = require("express");
const path = require("path");
const xkcd = require("./feeds/xkcd");

const app = express();

app.use(express.static(path.join(__dirname, "../dist")));

app.use("/xkcd", xkcd);

app.listen(3000, function() {
  console.log("server started on port 3000");
});
