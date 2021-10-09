var path = require("path");
const express = require("express");

const app = express();

app.use(express.static("public"));

// Landing page
app.get("/", function (req, res) {
  res.render("index.ejs");
});

app.listen(process.env.PORT || 3000, () => console.log(`Server has started.`));
