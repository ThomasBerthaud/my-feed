const express = require("express");
const path = require("path");
const axios = require("axios");
const xml2js = require("xml2js");
const morgan = require("morgan");

const app = express();
const parser = new xml2js.Parser();

app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "../dist")));

app.get("/feed", getFeed, function(req, res) {
  res.send(res.locals.feed);
});

app.get("/feed/latest", getFeed, function(req, res) {
  try {
    res.locals.feed.entries = [res.locals.feed.entries[0]];
    res.send(res.locals.feed);
  } catch (e) {
    console.error(e);
    res.status(500).send("An error occured while fetching feed");
  }
});

app.listen(3000, function() {
  console.log("server started on port 3000");
});

async function getFeed(req, res, next) {
  const feedUrl = req.query.url;

  if (!feedUrl) {
    console.error("missing feed url");
    res.status(400).send("missing feed url");
    return;
  }

  try {
    const response = await axios.get(feedUrl);
    parser.parseString(response.data, (err, result) => {
      if (err) next(err);
      const type = guessFeedType(result);
      const parsedFeed = type === "atom" ? parseAtomFeed(result) : parseRssFeed(result);
      res.locals.feed = parsedFeed;
      next();
    });
  } catch (e) {
    console.error(e);
    if (e.isAxiosError) res.status(400).send("could not fetch this feed");
    else res.status(500).send("An error occured while fetching feed");
  }
}

function guessFeedType(feed) {
  if (feed && feed.feed) {
    return "atom";
  } else {
    return "rss";
  }
}

function parseAtomFeed(atomFeed) {
  const parsed = {};
  const { feed } = atomFeed;

  parsed.title = feed.title[0];
  parsed.link = feed.link[0];
  parsed.id = feed.id[0];
  parsed.updated = feed.updated[0];

  parsed.entries = [];
  feed.entry.forEach(entry => {
    parsed.entries.push({
      id: entry.id[0],
      title: entry.title[0],
      link: entry.link[0].$.href,
      summary: entry.summary[0]._,
      updated: entry.updated[0]
    });
  });

  return parsed;
}

// TODO implement rss parser
function parseRssFeed(rssFeed) {
  const parsed = {};
  console.log(rssFeed);
  return parsed;
}
