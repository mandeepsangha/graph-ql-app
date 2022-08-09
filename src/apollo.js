const { GraphQLClient, gql } = require("graphql-request");

async function main() {
  const endpoint = "https://api.github.com/graphql";

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ` + "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",
    },
  });

  const query = gql`
    query ($login: String!) {
      user(login: $login) {
        repositories(isFork: false, first: 10) {
          nodes {
            name
            languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
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

  const variables = {
    login: "mandeepsangha",
  };

  const variables2 = {
    login: "hachi-ops",
  };

  const queryData = await graphQLClient.request(query, variables);

  return JSON.stringify(queryData, undefined, 2);
}

export default main;
