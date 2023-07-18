require("dotenv").config();
require("./startup/db")();
const express = require("express");
const app = express();
require("./startup/routes")(app);
require("./startup/config")();
require("./startup/prod")(app);

app.set("view-engine", "ejs");
app.get("/", (req, res) => {
  res.status(200).render("index.ejs");
});
app.get("*", (req, res) => {
  res.redirect("/");
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
