import "./App.css";
import allData from "./fetchGraph";
import Gallery from "./Gallery";
import { useState, useEffect } from "react-query";
import React from "react";

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
  //const [launches, setLaunches] = useState();

  // React.useEffect(() => {
  //   fetch("https://api.github.com/graphql", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "bearer " + github_data.token,
  //     },
  //     body: JSON.stringify({ query: FILMS_QUERY }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  // }, []);

  // const { data, isLoading, error } = useQuery("launches", () => {
  //   return fetch(endpoint, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "bearer " + github_data.token,
  //     },
  //     body: JSON.stringify({ query: FILMS_QUERY }),
  //   })
  //     .then((response) => {
  //       if (response.status >= 400) {
  //         throw new Error("Error fetching data");
  //       } else {
  //         return response.json();
  //       }
  //     })
  //     .then((data) => data.data);
  // });

  // if (isLoading) return "Loading...";
  // if (error) return <pre>{error.message}</pre>;

  return (
    <div className="App">
      <header className="App-header">
        <img className="App-logo" alt="logo" />
        <p>Hello</p>
        <Gallery />
      </header>
      <h1>SpaceX</h1>
    </div>
  );
}

export default App;
