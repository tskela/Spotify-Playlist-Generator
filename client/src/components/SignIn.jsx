import React, { useState } from "react";
import UserPortal from "./UserPortal.jsx";
import { signIn } from "../firebase.js";

const SignIn = () => {
  const [signedIn, setSignIn] = useState(false);

  const handleSignIn = (event) => {
    event.preventDefault();
    signIn().then(() => setSignIn(true));
  };

  const handleSignOut = () => {
    setSignIn(false);
  };

  return signedIn ? (
    <UserPortal signedIn={signedIn} onSignOut={handleSignOut} />
  ) : (
    <div>
      <h2>Sign In</h2>
      <button onClick={(event) => handleSignIn(event)}>
        Sign in with Google
      </button>
    </div>
  );
};

export default SignIn;
