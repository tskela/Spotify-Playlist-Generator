import React from "react";
import UserPortal from "./UserPortal.jsx";
import { signIn, signOut, auth, generateUserDocument } from "../firebase.js";

class SignIn extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <button
        onClick={() => {
          signIn();
        }}
      >
        Sign in with Google
      </button>
    );
  }
}

export default SignIn;
