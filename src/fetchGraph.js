const github_data = {
  token: process.env.REACT_APP_API_KEY,
  username: "mandeepsangha",
};

const fetch = require("node-fetch");

const body = {
  query: `
    query{
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
          }
                `,
};

const body2 = {
  query: `
      query{
          continents{
              name
              code
          }
      }`,
};

const body3 = {
  query: `
        query{
          user(login: "mandeepsangha") {
          pinnableItems {
              totalCount
            }
          } 
        }`,
};

const baseUrl = "https://api.github.com/graphql";

const headers = {
  "Content-Type": "application/json",
  Authorization: "bearer " + github_data.token,
};

// fetch(baseUrl, {
//   method: "POST",
//   headers: headers,
//   body: JSON.stringify(body),
// })
//   .then((response) => {
//     console.log(JSON.stringify(response));
//   })
//   .catch((err) => console.log(JSON.stringify(err)));

fetch(baseUrl, {
  method: "POST",
  headers: headers,
  body: JSON.stringify(body),
})
  .then((response) => response.json())
  .then((data) => allData(JSON.stringify(data)));

// var sentiments = await fetch(baseUrl, {
//   method: "POST",
//   body: JSON.stringify(body),
// });

let allData = (data) => {
  if (data) {
    let res = JSON.parse(data);
    let repoNodes = res.data.user.repositories.nodes;
    //console.log(repoNodes);

    repoNodes = repoNodes
      .filter((node) => node.languages.edges.length > 0)
      // flatten the list of language nodes
      .reduce((acc, curr) => curr.languages.edges.concat(acc), [])
      .reduce((acc, prev) => {
        // get the size of the language (bytes)
        let langSize = prev.size;

        // if we already have the language in the accumulator
        // & the current language name is same as previous name
        // add the size to the language size.
        if (
          acc[prev.node.name] &&
          prev.node.name === acc[prev.node.name].name
        ) {
          langSize = prev.size + acc[prev.node.name].size;
        }
        return {
          ...acc,
          [prev.node.name]: {
            name: prev.node.name,
            color: prev.node.color,
            size: langSize,
          },
        };
      }, {});
    const topLangs = Object.keys(repoNodes)
      .sort((a, b) => repoNodes[b].size - repoNodes[a].size)
      .reduce((result, key) => {
        result[key] = repoNodes[key];
        return result;
      }, {});

    console.log(topLangs);
    return topLangs;
  }
};

export default allData;