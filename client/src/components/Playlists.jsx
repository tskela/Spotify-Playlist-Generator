import React from "react";

class Playlists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props.playlists);
    return (
      <div>
        <div>Your Playlists</div>
      </div>
    );
  }
}

export default Playlists;
