const express = require("express");

const router = express.Router();

const Request = require("../request");

router.get("/", (req, res) => {
  res.redirect("/tracks/recent");
});

router.get("/recent", (req, res) => {
  new Request(res, "tracks", "short_term");
});

router.get("/six-months", (req, res) => {
  new Request(res, "tracks", "medium_term");
});

router.get("/all-time", (req, res) => {
  new Request(res, "tracks", "long_term");
});

module.exports = router;
