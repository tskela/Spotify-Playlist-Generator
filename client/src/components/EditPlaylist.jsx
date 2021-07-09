import React, { useContext, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { editPlaylist } from "../firebase.js";
import { deletePlaylist } from "../firebase.js";
import { UserContext } from "../providers/UserProvider.jsx";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import SpotifyLogin from "./SpotifyLogin.jsx";
import SpotifyPlayer from "react-spotify-player";
import $ from "jquery";

function EditPlaylist(props) {
  const user = useContext(UserContext);
  const { uid } = user;
  const [title, setTitle] = useState("");
  const [tracks, setTracks] = useState([]);
  const [index, setIndex] = useState(0);
  const [playlistUri, setURI] = useState("");

  useEffect(() => {
    if (props.name) {
      setTitle(props.name);
    }
    if (props.tracks) {
      setTracks(props.tracks);
    }
    if (props.index) {
      setIndex(props.index);
    }
    if (props.uri) {
      setURI(props.uri);
    }
  }, [props.name, props.tracks, props.index, props.uri]);

  const createPlaylist = (token) => {
    var uris = "";

    tracks.forEach((track) => (uris += `${track.uri},`));

    uris = uris.slice(0, uris.length - 1);

    $.ajax({
      method: "GET",
      url: "/userInfo",
      data: { token: token, uris: uris, name: title },
      contentType: "application/json",
      success: (data) => {
        console.log(data);
        setURI(data);
        editPlaylist(
          uid,
          { name: title, tracks: tracks },
          { name: title, tracks: tracks, uri: data }
        );
      },
    });
  };

  // const handleDelete = () => {
  //   var playlist;

  //   if (uri) {
  //     playlist = {
  //       name: title,
  //       tracks: tracks,
  //       uri: playlistUri,
  //     };
  //   } else {
  //     playlist = {
  //       name: title,
  //       tracks: tracks,
  //     };
  //   }

  //   deletePlaylist(uid, playlist)
  // };

  var playlistButton = title ? (
    <>
      <SpotifyLogin create={createPlaylist} />
    </>
  ) : null;

  var songs = tracks
    ? tracks.map((track) => (
        <div style={{ margin: "10px 0px" }}>
          <span style={{ color: "#0275d8", marginRight: "5px" }}>
            {track.title} -{" "}
          </span>
          <span style={{ color: "#989898" }}>{track.artist}</span>
        </div>
      ))
    : null;

  var embedded = playlistUri ? (
    <SpotifyPlayer
      size={{ width: "100%", height: 300 }}
      uri={playlistUri}
      view="list"
      theme="white"
    />
  ) : null;

  return (
    <>
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey={index}>
            {title}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={index}>
            <Card.Body>
              {playlistButton}
              {songs}
              {embedded}
            </Card.Body>
          </Accordion.Collapse>
        </Card.Header>
      </Card>
    </>
  );
}

export default EditPlaylist;
