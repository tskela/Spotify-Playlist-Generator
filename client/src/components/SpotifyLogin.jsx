import React from "react";
import { SpotifyApiContext } from "react-spotify-api";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";

import { SpotifyAuth, Scopes } from "react-spotify-auth";
import "react-spotify-auth/dist/index.css";

const SpotifyLogin = (props) => {
  const token = Cookies.get("spotifyAuthToken");
  return (
    <div className="app">
      {token ? (
        <SpotifyApiContext.Provider value={token}>
          <Button onClick={() => props.create(token)} style={{ margin: "10px 5px" }}>
            Save to Spotify
          </Button>
        </SpotifyApiContext.Provider>
      ) : (
        <SpotifyAuth
          title="Login to create on Spotify"
          redirectUri="http://localhost:3000/"
          clientID="37c90b68625244a082ba6e5571fb37d1"
          scopes={[
            "playlist-modify-public",
            "playlist-modify-private",
            "user-read-private",
            "user-read-email",
          ]}
        />
      )}
    </div>
  );
};
export default SpotifyLogin;
