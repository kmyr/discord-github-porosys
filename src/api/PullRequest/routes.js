const express = require("express");
const router = express.Router();
const PullRequestsServices = require("./services");

router.post("/", async (req, res) => {
  const payload = req.body;

  try {
    const dataResponse = await PullRequestsServices.receiveGithubPullRequest(
      payload
    );
    if (dataResponse) {
      res.json(dataResponse);
    }
  } catch (err) {
    console.error(`EEROR DATE: ${new Date()} =>`, err);
    res.status(404).json({
      message: "خطایی رخ داد.",
      error: err.message || JSON.stringify(err),
    });
  }
});

module.exports = router;
