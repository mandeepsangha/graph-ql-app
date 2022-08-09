import "./App.css";
import OneShow from "./OneShow";
import Home from "./Home";
// import React from "react";
// import { useState } from "react-query";
import React, { useState, useEffect } from "react";
import axios from "axios";

const github_data = {
  token: process.env.REACT_APP_API_KEY,
  username: "mandeepsangha",
};

function App() {
  // const [displayHello, setDisplayHello] = useState(false);

  // const handleClick = () => {
  //   setDisplayHello(!displayHello);
  // };
  //const [launches, setLaunches] = useState();

  //const [data, setData] = useState();

  // if (isLoading) return "Loading...";
  // if (error) return <pre>{error.message}</pre>;

  return (
    <div className="App">
      <header className="App-header">
        <div>The Favoured Language on Github for</div>
        <Home />
      </header>
      <h1>MVF Project</h1>
    </div>
  );
}

export default App;
