import react, { useState, useEffect } from "react";

function OneShow({ username }) {
  const [counter, setCounter] = useState("");

  let variables = username;

  let allData = (input) => {
    if (input) {
      let res = JSON.parse(input);
      //console.log(res)
      let repoNodes = "";
      repoNodes = res.user.repositories.nodes;
      //let repoNodes = res.data.user.repositories.nodes;
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

      let max = Object.values(topLangs);
      let maxKey = max[0].name;
      //console.log(topLangs);
      //console.log(maxKey);

      setCounter(JSON.stringify(maxKey));
      //console.log(toptop)
    }
  };

  useEffect(() => {
    main(variables).then((data) => allData(data));
  }, [variables]);

  return <p>{counter}</p>;
}

export default OneShow;

const { GraphQLClient, gql } = require("graphql-request");

async function main(variablesinput) {
  const endpoint = "https://api.github.com/graphql";
  //console.log(variablesinput);
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      "Content-Type": "application/json",
      //Authorization: `bearer ` + "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",
      Authorization: `Bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
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
