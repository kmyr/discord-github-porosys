const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const config = require("./src/common/helper/configs/app.config");
const Routes = require("./src/common/routes");

require("dotenv/config");

app.use(cors());
app.use(bodyParser.json());

app.use("/api", Routes);

app.listen(config.app_port, () => {
  console.log("connected to server", `PORT: ${config.app_port}`);
});
