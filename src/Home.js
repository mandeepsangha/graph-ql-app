import { useRef, useState, useEffect, createContext } from "react";
import User from "./User";
import OneShow from "./OneShow";
export const StateContext = createContext();

export default function Home() {
  const inputRef = useRef();
  const [username, setUserName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(inputRef.current.value);
    const githubUsername = inputRef.current.value;
    if (!githubUsername.trim()) return;
    setUserName(githubUsername);
    //console.log(githubUsername);
    e.target.reset();
  };
  //console.log(username);

  return (
    <div>
      <User username={username} />
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="search"
          placeholder="enter a github username"
        />
      </form>
    </div>
  );
}
