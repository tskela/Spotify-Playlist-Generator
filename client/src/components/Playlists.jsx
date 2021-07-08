import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider.jsx";
import EditPlaylist from "./EditPlaylist.jsx";

const Playlists = (props) => {
  const user = useContext(UserContext);
  const { playlists } = user;

  const savedPlaylists =
    playlists && playlists.map((playlist) => <EditPlaylist info={playlist} />);

  const recentlySaved = props.saved && <EditPlaylist info={props.saved[0]} />;

  return (
    <div>
      <h3>Your Saved Playlists</h3>{" "}
      <div>
        {savedPlaylists}
        {recentlySaved}
      </div>
    </div>
  );
};

export default Playlists;
