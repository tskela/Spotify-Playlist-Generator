import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../providers/UserProvider.jsx";
import { savePlaylist } from "../firebase.js";

const DisplayNewPlaylist = (props) => {
  const user = useContext(UserContext);
  const { uid } = user;
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    if (props.generated.length) {
      setPlaylist(props.generated);
    }
  }, [props.generated]);

  const handleSave = (e) => {
    e.preventDefault();

    var toSave = {
      name: "Example playlist 2",
      tracks: playlist,
    };

    savePlaylist(uid, toSave)
      .then(() => props.displaySaved(toSave))
      .catch((err) => console.log(err));
  };

  const tracks = playlist.map((track) => {
    return (
      <div>
        <span>{track.title}</span>
        {track.artist}
      </div>
    );
  });

  const save = (playlist.length && (
    <button onClick={(e) => handleSave(e)}> Save Playlist</button>
  ));

  return (
    <div>
      {tracks} {save}
    </div>
  );
};

export default DisplayNewPlaylist;
