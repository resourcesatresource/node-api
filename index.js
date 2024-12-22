require("dotenv").config();
const config = require("config");
const cors = require("cors");

const initDB = require("./startup/db");
const initRoute = require("./startup/routes");
const initConfig = require("./startup/config");
const initProductionSetup = require("./startup/prod");

const express = require("express");
const app = express();
app.use(cors());

initConfig(); /* Validates if we have necessary configs in .env */
initDB();
initRoute(app);
initProductionSetup(app);

app.set("view-engine", "ejs");

app.get("/", (req, res) => {
  res.status(200).render("index.ejs");
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "not found" }).end();
});

const port = config.get("port") || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
