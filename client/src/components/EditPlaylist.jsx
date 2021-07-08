import React, { useContext, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { editPlaylist } from "../firebase.js";
import { UserContext } from "../providers/UserProvider.jsx";

function EditPlaylist(props) {
  const user = useContext(UserContext);
  const { uid } = user;
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (props.info) {
      setTitle(props.info.name);
    }
  }, [props.info]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (e) => setTitle(e.target.value);

  const handleSave = (e) => {
    e.preventDefault();

    var playlist = {
      name: title,
      tracks: props.info.tracks,
    };

    editPlaylist(uid, props.info, playlist);
    handleClose();
  };

  var playlistButton = title ? (
    <Button variant="primary" onClick={handleShow}>
      {title}
    </Button>
  ) : null;

  return (
    <>
      {playlistButton}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Edit playlist name</Form.Label>
              <Form.Control
                type="text"
                placeholder={title}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => handleSave(e)}
            >
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditPlaylist;
