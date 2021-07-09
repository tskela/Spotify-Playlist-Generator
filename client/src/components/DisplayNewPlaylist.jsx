import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../providers/UserProvider.jsx";
import { savePlaylist } from "../firebase.js";
import SpotifyPlayer from "react-spotify-player";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const DisplayNewPlaylist = (props) => {
  const user = useContext(UserContext);
  const { uid } = user;
  const [playlist, setPlaylist] = useState([]);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("")

  useEffect(() => {
    if (props.generated.length) {
      setPlaylist(props.generated);
    }
  }, [props.generated]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => setTitle(e.target.value);

  const handleSave = (e) => {
    e.preventDefault();

    var toSave = {
      name: title,
      tracks: playlist,
    };

    savePlaylist(uid, toSave)
      .then(() => props.displaySaved(toSave))
      .catch((err) => console.log(err));
  };

  const size = {
    width: "100%",
    height: 100,
  };

  const view = "coverart";

  const theme = "white";

  const tracks = playlist.map((track) => {
    return (
      <div>
        <SpotifyPlayer uri={track.uri} size={size} view={view} theme={theme} />
      </div>
    );
  });

  const save = playlist.length ? (
    <Button onClick={handleShow}> Save Playlist</Button>
  ) : null;

  return (
    <div>
      {tracks} {save}

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Playlist Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Chill beats"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => handleSave(e)}
            >
              Save Playlist
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DisplayNewPlaylist;
