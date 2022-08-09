import react, { useState, useEffect } from "react";

import main from "./apollo";

function OneShow() {
  const [toptop, setTopTop] = useState("");
  let output = 0;

  main().then((data) => setTopTop(data));

  // useEffect(() => {
  //   if (!toptop) {
  //     output = main();
  //   }
  // }, []);

  let allData = (data) => {
    data = toptop;
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

      let max = Object.values(topLangs);
      let maxKey = max[0].name;
      //console.log(topLangs);
      //console.log(maxKey);

      setTopTop(JSON.stringify(maxKey));
      //return topLangs;
    }
  };

  return <p>{toptop}</p>;
}

export default OneShow;
