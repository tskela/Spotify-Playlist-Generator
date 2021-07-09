import React from "react";
import UserPortal from "./UserPortal.jsx";
import { signIn, signOut, auth, generateUserDocument } from "../firebase.js";
import Button from "react-bootstrap/Button";

class SignIn extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div
        style={{
          position: "absolute",
          textAlign: "center",
          top: "50%",
          bottom: "50%",
          width: "100%",
        }}
      >
        <h1>Playlist Generator</h1>
        <Button
          onClick={() => {
            signIn();
          }}
        >
          Sign in with Google
        </Button>
      </div>
    );
  }
}

export default SignIn;
