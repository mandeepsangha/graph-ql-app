import { useRef, useState, createContext } from "react";
import User from "./User";

export const StateContext = createContext();

export default function Home() {
  const inputRef = useRef();
  const [username, setUserName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const githubUsername = inputRef.current.value;
    if (!githubUsername.trim()) return;
    setUserName(githubUsername);

    e.target.reset();
  };

  return (
    <div>
      <User username={username} />
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="search"
          placeholder=""
        />
        <div>Please type in a Github Username</div>
        <button data-testid="button" type ="submit">Submit</button>
      </form>
    </div>
  );
}
