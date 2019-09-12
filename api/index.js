const express = require("express");
const path = require("path");
const axios = require("axios");
const xml2js = require("xml2js");

const app = express();
const parser = new xml2js.Parser();
const PORT = process.env.PORT || 3000;

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

app.listen(PORT, function() {
  console.log(`server started on port ${PORT}`);
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
  parsed.link = feed.link[0].$.href;
  parsed.id = encode(feed.id[0]);
  parsed.updated = feed.updated[0];

  parsed.entries = [];
  feed.entry.forEach(entry => {
    parsed.entries.push({
      id: encode(entry.id[0]),
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
  const feed = rssFeed.rss.channel[0];

  parsed.title = feed.title[0];
  parsed.link = feed.link[0];
  parsed.id = encode(feed.link[0]);
  parsed.updated = feed.item[0].pubDate[0];
  parsed.entries = [];
  feed.item.forEach(item => {
    parsed.entries.push({
      id: encode(item.link[0]),
      title: item.title[0],
      link: item.link[0],
      summary: item.description[0],
      updated: item.pubDate[0]
    });
  });
  console.log(rssFeed);
  return parsed;
}

function encode(str) {
  const buffer = new Buffer(str);
  return buffer.toString("base64");
}
