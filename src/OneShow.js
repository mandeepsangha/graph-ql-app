import react, { useState, useEffect } from "react";

function OneShow({ username }) {
  const [counter, setCounter] = useState("");

  let variables = username;

  let allData = (input) => {
    if (input) {
      let res = JSON.parse(input);

      let repoNodes = "";
      repoNodes = res.user.repositories.nodes;

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

      let maxList = Object.values(topLangs);
      let maxKey = maxList[0].name;
      let result = JSON.stringify(maxKey).replace(/["']/g, "");
      setCounter(result);
    }
  };

  useEffect(() => {
    mainRequest(variables).then((data) => allData(data));
  }, [variables]);
  console.log(typeof counter);
  return <p>{counter}</p>;
}

export default OneShow;

const { GraphQLClient, gql } = require("graphql-request");

async function mainRequest(variablesinput) {
  const endpoint = "https://api.github.com/graphql";
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
    },
  });

  const query = gql`
    query ($login: String!) {
      user(login: $login) {
        repositories(isFork: false, first: 100) {
          nodes {
            name
            languages(first: 100, orderBy: { field: SIZE, direction: DESC }) {
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
  `;

  let variables = {
    login: variablesinput,
  };

  //console.log(variablesinput);
  if (variablesinput) {
    const queryData = await graphQLClient.request(query, variables);
    return JSON.stringify(queryData, undefined, 2);
  }
}
