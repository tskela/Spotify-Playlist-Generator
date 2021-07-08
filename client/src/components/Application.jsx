import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./SignIn.jsx";
import UserProvider from "../providers/UserProvider.jsx";
import UserPortal from "./UserPortal.jsx";
import { UserContext } from "../providers/UserProvider.jsx";

function Application() {
  const user = useContext(UserContext);
  return user ? (
    <UserPortal />
  ) : (
    <Router>
      <Switch>
        <Route path="/">
          <SignIn />
        </Route>
      </Switch>
    </Router>
  );
}

export default Application;
