import "./App.css";
import allData from "./fetchGraph";
import Gallery from "./Gallery";
import Welcome from "./fetchGraph";
// import React from "react";
// import { useState } from "react-query";
import React, { useState } from "react";
import axios from "axios";
const github_data = {
  token: process.env.REACT_APP_API_KEY,
  username: "mandeepsangha",
};

const endpoint = "https://api.github.com/graphql";
const FILMS_QUERY = `
  user(login: "mandeepsangha") {
      repositories(affiliations: OWNER, isFork: false, first: 10) {
        nodes {
          name 
          languages(first:10,orderBy:{field:SIZE,direction:DESC}){
            edges {
                    size
                    node {
                      color
                      name
                    }
                  }
   }
              }
            }
          }         
`;

function App() {
  const [displayHello, setDisplayHello] = useState(false);

  const handleClick = () => {
    setDisplayHello(!displayHello);
  };
  //const [launches, setLaunches] = useState();

  const [data, setDate] = useState([]);

  //   useEffect ( () => {
  // const fetchData = async () => {
  //   //call GraphQL API
  //   const queryResult = await axios.post (
  //     "https://api.github.com/graphql", {
  //       query: FILMS_QUERY
  //     }
  //   );
  //   //update the compoenet state
  //   const result = queryResult.data.data
  //   setData(result)
  //   };
  //   fetchData();
  // },[])

  // if (isLoading) return "Loading...";
  // if (error) return <pre>{error.message}</pre>;

  return (
    <div className="App">
      <header className="App-header">
        <div>
          Your Top Language is: <Welcome />
        </div>
        <p></p>
        <input></input>
        <div>
          <button>Button</button>
        </div>
      </header>
      <h1>MVF Project</h1>
    </div>
  );
}

export default App;
