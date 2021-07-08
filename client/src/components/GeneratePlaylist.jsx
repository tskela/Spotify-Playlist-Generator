import React from "react";
import $ from "jquery";
import DisplayNewPlaylist from "./DisplayNewPlaylist.jsx";

class GeneratePlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: "",
      seed_genres: "",
      seed_tracks: "",
      seed_artists: "",
      generated: [],
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    var request = {
      limit: this.state.limit,
      seed_genres: this.state.seed_genres,
      seed_artists: this.state.seed_artists,
      seed_tracks: this.state.seed_tracks,
    };

    $.ajax({
      method: "POST",
      url: "/recommendations",
      dataType: "json",
      data: request,
      success: (result) => {
        this.extractTracks(result);
      },
    });
  }

  extractTracks(tracks) {
    var playlist = [];

    tracks.forEach((track) => {
      var trackInfo = {
        title: track.name,
        artist: track.artists[0].name,
      };

      playlist.push(trackInfo);
    });

    this.setState({
      generated: playlist,
    });
  }

  render() {
    return (
      <div>
        <h2>Generate a new playlist</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Number of songs:
            <input
              type="number"
              min={0}
              max={25}
              name="limit"
              value={this.state.limit}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <br />
          <label>
            Pick a seed genre:
            <input
              type="text"
              name="seed_genres"
              value={this.state.seed_genres}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <br />
          <label>
            Pick a seed artist:
            <input
              type="text"
              name="seed_artists"
              value={this.state.seed_artists}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <br />
          <label>
            Pick a seed track:
            <input
              type="text"
              name="seed_tracks"
              value={this.state.seed_tracks}
              onChange={this.handleInputChange}
            />
          </label>
          <button type="submit" value="Generate">
            Generate
          </button>
        </form>
        <DisplayNewPlaylist
          generated={this.state.generated}
          save={this.state.savePlaylist}
          displaySaved={this.props.displaySaved}
        />
      </div>
    );
  }
}

export default GeneratePlaylist;
