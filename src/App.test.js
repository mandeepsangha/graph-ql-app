import { getByTestId, render, screen } from "@testing-library/react";
import { toNamespacedPath } from "path";
import App from "./App";
import Home from "./Home";

//**Unit Testing **//

// //Regex
test("There is no quotation marks in output when input has quotations marks", () => {
  let string = ` "SASS" `;
  expect(string).toMatch((/["]/g, ""));
});
