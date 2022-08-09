import react from "react";
import OneShow from "./OneShow";

export default function User({ username }) {
  return (
    <div>
      <div>{username} :</div>
      <OneShow username={username} />
    </div>
  );
}
