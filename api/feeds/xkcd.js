const express = require("express");
const axios = require("axios");
const xml2js = require("xml2js");
const router = express.Router();

const parser = new xml2js.Parser();

router.get("/latest", async function(req, res) {
  try {
    const response = await axios.get("https://xkcd.com/atom.xml");
    parser.parseString(response.data, (err, result) => {
      if (err) throw err;
      res.send(result.feed.entry[0]);
    });
  } catch (e) {
    console.error(e);
    res.status(500).send("An error occured");
  }
});

module.exports = router;
