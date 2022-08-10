import "./App.css";

import Home from "./Home";
// import React from "react";
// import { useState } from "react-query";




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
