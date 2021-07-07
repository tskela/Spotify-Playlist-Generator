import React, { useState } from "react";

const UserPortal = (props) => {
  return (
    <div>
      <div>Welcome</div>
      <button onClick={props.onSignOut}>Sign Out</button>
    </div>
  );
};

export default UserPortal;
