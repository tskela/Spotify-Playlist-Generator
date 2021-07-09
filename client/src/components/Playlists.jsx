import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../providers/UserProvider.jsx";
import EditPlaylist from "./EditPlaylist.jsx";
import Accordion from "react-bootstrap/Accordion";

const Playlists = (props) => {
  const user = useContext(UserContext);
  const { playlists } = user;
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    if (props.saved) {
      setRecent(props.saved);
    }
  }, [props.saved]);

  const savedPlaylists =
    playlists &&
    playlists.map((playlist, i) => {
      return (
        <EditPlaylist
          index={i + 1}
          name={playlist.name}
          tracks={playlist.tracks}
          uri={playlist.uri}
        />
      );
    });

  const recentlySaved = recent[0] ? (
    <EditPlaylist
      index={playlists.length + 1}
      name={recent[0]}
      tracks={recent[1]}
      uri={""}
    />
  ) : null;

  return (
    <div>
      <h3>Your Saved Playlists</h3>
      <div>
        <Accordion defaultActiveKey="0">
          {savedPlaylists}
          {recentlySaved}
        </Accordion>
      </div>
    </div>
  );
};

export default Playlists;
