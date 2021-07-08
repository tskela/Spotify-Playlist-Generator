import React, { useContext } from "react";
import Application from "./components/Application.jsx";
import UserProvider from "./providers/UserProvider.jsx";
import { UserContext } from "./providers/UserProvider.jsx";

function App() {

  return (
    <UserProvider>
      <Application />
    </UserProvider>
  );
}

export default App;