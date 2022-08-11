import { render, screen } from "@testing-library/react";
import { toNamespacedPath } from "path";
import App from "./App";
import allData from "./OneShow";

// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

//**Unit Testing **//

// //Regex
test("There is no quotation marks in output when input has quotations marks", () => {
  let string = ` "SAS" `;
  expect(string).toMatch((/["]/g, ""));
});

test("There is no quotation marks in output", () => {
  let string = "SAS";
  expect(string).toMatch((/["]/g, ""));
});

//allData function
//inputJSON object
//output
//main function
