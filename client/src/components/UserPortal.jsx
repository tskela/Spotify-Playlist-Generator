import React, { useContext, useState } from "react";
import { UserContext } from "../providers/UserProvider.jsx";
import { signOut } from "../firebase.js";
import Playlists from "./Playlists.jsx";
import GeneratePlaylist from "./GeneratePlaylist.jsx";

const UserPortal = () => {
  const user = useContext(UserContext);
  const { displayName } = user;
  const [recentlySaved, setSaved] = useState([]);

  const displaySaved = ({ name, tracks }) => {
    setSaved([name, tracks]);
  };

  return (
    <div>
      <div>Welcome {displayName}</div>
      <button onClick={() => signOut()}>Sign Out</button>
      <Playlists saved={recentlySaved} />
      <GeneratePlaylist displaySaved={displaySaved} />
    </div>
  );
};

export default UserPortal;
