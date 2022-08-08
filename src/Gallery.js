import React, { useEffect, useState } from "react";

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

function Gallery() {
  const [galleryResults, setGalleryResults] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "bearer " + github_data.token,
      };
      const apiResponse = await fetch("https://api.github.com/graphql", {
        headers,
      });
      const apiResponseJSON = await apiResponse.json();
      console.log(apiResponseJSON.data);
    }
    fetchData();
  }, []);
}
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "bearer " + github_data.token,
//       },
//       body: JSON.stringify({ query: FILMS_QUERY }),
//     })
//       .then((response) => response.json())
//       .then((data) => allDataTwo(JSON.stringify(data)));
//   }, []);

// let allDataTwo = (data) => {
//   let res = JSON.parse(data);
//   let repoNodes = res.data.user.repositories.nodes;
//   //console.log(repoNodes);

//   repoNodes = repoNodes
//     .filter((node) => node.languages.edges.length > 0)
//     // flatten the list of language nodes
//     .reduce((acc, curr) => curr.languages.edges.concat(acc), [])
//     .reduce((acc, prev) => {
//       // get the size of the language (bytes)
//       let langSize = prev.size;

//       // if we already have the language in the accumulator
//       // & the current language name is same as previous name
//       // add the size to the language size.
//       if (acc[prev.node.name] && prev.node.name === acc[prev.node.name].name) {
//         langSize = prev.size + acc[prev.node.name].size;
//       }
//       return {
//         ...acc,
//         [prev.node.name]: {
//           name: prev.node.name,
//           color: prev.node.color,
//           size: langSize,
//         },
//       };
//     }, {});
//   const topLangs = Object.keys(repoNodes)
//     .sort((a, b) => repoNodes[b].size - repoNodes[a].size)
//     .reduce((result, key) => {
//       result[key] = repoNodes[key];
//       return result;
//     }, {});

//   console.log(topLangs);
//   return topLangs;

export default Gallery;
