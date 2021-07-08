import React from "react";
import Playlists from "./Playlists.jsx";
import GeneratePlaylist from "./GeneratePlaylist.jsx";

class UserPortal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>Welcome {this.props.displayName}</div>
        <button onClick={this.props.onSignOut}>Sign Out</button>
        <Playlists playlists={this.props.playlists}/>
        <GeneratePlaylist uid={this.props.uid} />
      </div>
    );
  }
}

export default UserPortal;
