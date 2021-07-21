import React, { useContext, useState } from "react";
import { UserContext } from "../providers/UserProvider.jsx";
import { signOut } from "../firebase.js";
import Playlists from "./Playlists.jsx";
import GeneratePlaylist from "./GeneratePlaylist.jsx";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const UserPortal = () => {
  const user = useContext(UserContext);
  const { displayName, photoURL } = user;
  const [recentlySaved, setSaved] = useState([]);

  const displaySaved = ({ name, tracks }) => {
    setSaved([name, tracks]);
  };

  return (
    <div>
      <Container fluid>
        <Row style={{ margin: "5%" }}>
          <Col>
            <Playlists saved={recentlySaved} />
          </Col>
          <Col style={{ display: "flex", justifyContent: "center" }}>
            <GeneratePlaylist displaySaved={displaySaved} />
          </Col>
          <Col style={{ display: "flex", justifyContent: "center" }}>
            <div>
              <img style={{borderRadius: "50%"}} src={photoURL}/>
              <div>Welcome {displayName}</div>
              <div>
                <Button onClick={() => signOut()}>Sign Out</Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserPortal;
