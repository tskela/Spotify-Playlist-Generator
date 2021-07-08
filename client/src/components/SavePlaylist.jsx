import React from "react";
import { savePlaylist } from "../firebase.js";

class SavePlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSave() {
    var playlist = {
      name: "Example playlist",
      tracks: this.props.playlist,
    };

    generateUserDocument(this.props.uid, playlist).then((document) =>
      console.log(document)
    );
  }

  render() {
    return <div>hello</div>;
  }
}

export default SavePlaylist;