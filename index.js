require("./startup/db")();
const express = require("express");
const app = express();
require("./startup/routes")(app);
require("./startup/config")();
require("./startup/prod")(app);
app.get("/", (req, res) => {
  console.log("entry point");
  res
    .send(
      "node-api app by saurav sanjay, soon it will serve JSON object at api\\user"
    )
    .status(200);
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
