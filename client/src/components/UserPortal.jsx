import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider.jsx";
import { signOut } from "../firebase.js";
import Playlists from "./Playlists.jsx";
import GeneratePlaylist from "./GeneratePlaylist.jsx";

const UserPortal = () => {
  const user = useContext(UserContext);
  const { uid, photoURL, displayName, email, playlists } = user;
  console.log(user);

  return (
    <div>
      <div>Welcome {displayName}</div>
      <button onClick={() => signOut()}>Sign Out</button>
      <Playlists playlists={playlists} />
      <GeneratePlaylist uid={uid} />
    </div>
  );
};

export default UserPortal;
