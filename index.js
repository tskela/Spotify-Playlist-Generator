const express = require("express");
const bodyParser = require('body-parser');
const port = 3000;
const SpotifyWebApi = require("spotify-web-api-node");
const config = require("./config.js");

let app = express();

app.use(express.static(__dirname + "/client/dist"));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/dist/index.html", function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

var spotifyApi = new SpotifyWebApi({
  clientId: config.clientId,
  clientSecret: config.clientSecret,
});

app.post("/recommendations", (req, res) => {
  spotifyApi
    .clientCredentialsGrant()
    .then((data) => {
      spotifyApi.setAccessToken(data.body["access_token"]);

      return spotifyApi.getRecommendations({
        limit: req.body.limit,
        market: "US",
        seed_artists: req.body.seed_artists,
        seed_genres: req.body.seed_genres,
        seed_tracks: req.body.seed_tracks,
      });
    })
    .then(
      function (data) {
        res.send(data.body.tracks);
      },
      function (err) {
        console.error(err);
      }
    );
});

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
