import React from "react";

import withAuthorization from "../Session";

const HomePage = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>The home page is accessible by every signed in user</p>
    </div>
  );
};

const condition = (authUser) => !!authUser;

export default HomePage;
