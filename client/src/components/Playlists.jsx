import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider.jsx";

const Playlists = (props) => {
  const user = useContext(UserContext);
  const { playlists } = user;

  const savedPlaylists =
    playlists && playlists.map((playlist) => <div>{playlist.name}</div>);

  const recentlySaved = props.saved && <div>{props.saved[0]}</div>;

  return (
    <div>
      <h3>Your Saved Playlists</h3>{" "}
      <div>
        {savedPlaylists}
        <div>{recentlySaved}</div>
      </div>
    </div>
  );
};

export default Playlists;
