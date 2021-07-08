import React from "react";
import { savePlaylist } from "../firebase.js";

class DisplayNewPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: [],
    };

    this.handleSave = this.handleSave.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.generated !== prevProps.generated) {
      this.setState({
        playlist: this.props.generated,
      });
    }
  }

  handleSave(e) {
    console.log("attempting to save playlist")
    e.preventDefault();

    var playlist = {
      name: "Example playlist",
      tracks: this.state.playlist,
    };

    savePlaylist(this.props.uid, playlist)
    .then((document) =>
      console.log(document))
    .catch((err) => console.log(err));
  }

  render() {
    var tracks = [];

    var savePlaylist = null;

    if (this.state.playlist.length > 0) {
      this.state.playlist.forEach((track) => {
        tracks.push(
          <div>
            <span>{track.title}</span>
            {track.artist}
          </div>
        );
      });

      savePlaylist = (
        <button
          onClick={(e) => this.handleSave(e)}
          playlist={this.state.playlist}
          uid={this.props.uid}>
            Save Playlist
        </button>
      );
    }

    return (
      <div>
        {tracks} {savePlaylist}
      </div>
    );
  }
}

export default DisplayNewPlaylist;
