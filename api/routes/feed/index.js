const express = require("express");
const router = express.Router();
const { getFeed } = require("./helpers");

router.get("/", getFeed, function(req, res) {
  res.send(res.locals.feed);
});
router.get("/latest", getFeed, function(req, res) {
  try {
    res.locals.feed.entries = [res.locals.feed.entries[0]];
    res.send(res.locals.feed);
  } catch (e) {
    console.error(e);
    res.status(500).send("An error occured while fetching feed");
  }
});
router.get("/check", getFeed, function(req, res) {
  res.status(200).send();
});

module.exports = router;
