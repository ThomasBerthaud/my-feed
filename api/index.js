const express = require("express");
const path = require("path");

const feed = require("./routes/feed");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../dist")));

app.use("/feed", feed);

app.listen(PORT, function() {
  console.log(`server started on port ${PORT}`);
});
