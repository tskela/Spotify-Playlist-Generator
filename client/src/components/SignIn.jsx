import React from "react";
import UserPortal from "./UserPortal.jsx";
import { signIn, signOut, auth, generateUserDocument } from "../firebase.js";

class SignIn extends React.Component {
  constructor() {
    super();
    // this.state = {
    //   signedIn: false,
    //   uid: "",
    //   email: "",
    //   displayName: "",
    //   photoURL: "",
    //   playlists: [],
    // };

    // this.handleSignOut = this.handleSignOut.bind(this);
  }

  // handleSignIn = (event) => {
  //   event.preventDefault();
  //   signIn().then((res) => {
  //     this.setState(
  //       {
  //         uid: res.user.uid,
  //         email: res.user.email,
  //         displayName: res.user.displayName,
  //         photoURL: res.user.photoURL,
  //         signedIn: true,
  //       },
  //       () => {
  //         generateUserDocument(res.user).then((document) =>
  //           this.setState({
  //             playlists: document.playlists,
  //           })
  //         );
  //       }
  //     );
  //   });
  // };

  // handleSignOut = () => {
  //   signOut();
  //   this.setState({
  //     signedIn: false,
  //   });
  // };

  render() {
    // return this.state.signedIn ? (
    //   <UserPortal
    //     uid={this.state.uid}
    //     email={this.state.email}
    //     displayName={this.state.displayName}
    //     photoURL={this.state.photoURL}
    //     playlists={this.state.playlists}
    //     onSignOut={this.handleSignOut}
    //   />
    // ) : (
    //   <div>
    //     <h2>Sign In</h2>
    //     <button onClick={(event) => this.handleSignIn(event)}>
    //       Sign in with Google
    //     </button>
    //   </div>
    // );

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
