const express = require("express");
const app = express();

const PullRequest = require("../../api/PullRequest/routes");

app.use("/pull-requests", PullRequest)

module.exports = app;
