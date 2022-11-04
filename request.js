const axios = require("axios");
require("dotenv").config();

const TOKEN = process.env.TOKEN;

const header = { headers: { Authorization: `Bearer ${TOKEN}` } };
const user = "me";

class Track {
  constructor(name, url, cover, duration, album, artist, artist_link, preview) {
    this.name = name;
    this.url = url;
    this.cover = cover;
    this.duration = duration;
    this.album = album;
    this.artist = artist;
    this.artist_link = artist_link;
    this.preview = preview;
  }
}

class Artist {
  constructor(name, url, followers, genres, image) {
    this.name = name;
    this.spotify = url;
    this.followers = followers;
    this.genres = genres;
    this.image = image;
  }
}

class Request {
  constructor(res, type, range) {
    if (type === "tracks") {
      tracksHandler(res, range);
    } else if (type === "artists") {
      artistsHandler(res, range);
    } else {
      res.send("Illegal request!");
    }
  }
}

function msToMin(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

function tracksHandler(res, range) {
  let topTracks = [];

  axios
    .get(
      `https://api.spotify.com/v1/${user}/top/tracks?time_range=${range}&limit=1`,
      header
    )
    .then((response) => {
      response.data.items.forEach((i) => {
        topTracks.push(
          new Track(
            i.name,
            i.external_urls.spotify,
            i.album.images[0].url,
            msToMin(i.duration_ms),
            i.album.name,
            i.artists[0].name,
            i.artists[0].external_urls.spotify,
            i.preview_url
          )
        );
      });

      res.json(topTracks);
    });
}

function artistsHandler(res, range) {
  let topArtists = [];

  axios
    .get(
      `https://api.spotify.com/v1/${user}/top/artists?time_range=${range}&limit=10`,
      header
    )
    .then((response) => {
      response.data.items.forEach((i) =>
        topArtists.push(
          new Artist(
            i.name,
            i.external_urls.spotify,
            i.followers.total,
            i.genres,
            i.images[0].url
          )
        )
      );

      res.json(topArtists);
    });
}

module.exports = Request;
