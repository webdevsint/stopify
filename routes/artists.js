const express = require("express");

const router = express.Router();

const Request = require("../request");

router.get("/", (req, res) => {
  res.redirect("/artists/recent");
});

router.get("/recent", (req, res) => {
  new Request(res, "artists", "short_term");
});

router.get("/six-months", (req, res) => {
  new Request(res, "artists", "medium_term");
});

router.get("/all-time", (req, res) => {
  new Request(res, "artists", "long_term");
});

module.exports = router;
