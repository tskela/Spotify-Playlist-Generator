const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;
const SpotifyWebApi = require("spotify-web-api-node");
const config = require("./config.js");
const fetch = require("node-fetch");

let app = express();

app.use(express.static(__dirname + "/client/dist"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/dist/index.html", function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.get("/login", function (req, res) {
  console.log("is this working?");
  var scopes = "playlist-modify-public playlist-modify-private";
  res.redirect(
    "https://accounts.spotify.com/authorize" +
      "?response_type=code" +
      "&client_id=" +
      config.clientId +
      (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
      "&redirect_uri=" +
      encodeURIComponent("http://localhost:3000/")
  );
});

var spotifyApi = new SpotifyWebApi({
  clientId: config.clientId,
  clientSecret: config.clientSecret,
});

const scopes = ["playlist-modify-public", "playlist-modify-private"];

app.get("/userInfo", async (req, res) => {
  console.log(req.query);
  const data = await fetch(`https://api.spotify.com/v1/me`, {
    method: "GET",
    headers: { Authorization: "Bearer " + req.query.token },
  });

  const response = await data.json();

  console.log(response);

  const newPlaylist = await fetch(
    `https://api.spotify.com/v1/users/${response.id}/playlists`,
    {
      method: "POST",
      headers: { Authorization: "Bearer " + req.query.token },
      body: JSON.stringify({
        name: `${req.query.name}`,
        description: "New playlist description",
        public: true,
      }),
    }
  );

  const created = await newPlaylist.json();

  const addTracks = await fetch(
    `https://api.spotify.com/v1/playlists/${created.id}/tracks?uris=${req.query.uris}`,
    {
      method: "POST",
      headers: { Authorization: "Bearer " + req.query.token, ContentLength: 0 },
    }
  );

  console.log(addTracks, created.uri);
  res.end(created.uri);
});

app.post("/recommendations", (req, res) => {
  spotifyApi
    .clientCredentialsGrant()
    .then((data) => {
      spotifyApi.setAccessToken(data.body["access_token"]);
      if (req.body.seed_artists) {
        return spotifyApi
          .searchArtists(`${req.body.seed_artists}`)
          .then((response) => {
            console.log(response.body);
            return spotifyApi.getRecommendations({
              limit: req.body.limit,
              market: "US",
              seed_artists: response.body.artists.items[0].id,
              seed_genres: req.body.seed_genres,
              seed_tracks: req.body.seed_tracks,
              target_danceability: req.body.target_danceability,
              target_energy: req.body.energy,
              target_tempo: req.body.tempo,
            });
          });
      } else {
        return spotifyApi.getRecommendations({
          limit: req.body.limit,
          market: "US",
          seed_artists: req.body.seed_artists,
          seed_genres: req.body.seed_genres,
          seed_tracks: req.body.seed_tracks,
          target_danceability: req.body.target_danceability,
          target_energy: req.body.energy,
          target_tempo: req.body.tempo,
        });
      }
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
