import React, { useState } from "react";
import Card from "./components/Card";
import "./App.css";

function App() {
  const [username, setUsername] = useState("commodoro"); // CHANGE THIS
  const [starredRepositoriesData, setStarredRepositoriesData] = useState<
    Array<any>
  >([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const fetchIssues = async () => {
    try {
      // Get starred repostories
      const response = await fetch(
        `https://api.github.com/users/${username}/starred`
      );
      const starredRepos = await response.json();
      setStarredRepositoriesData(starredRepos);
    } catch (error) {
      console.error("Error App.tsx:", error);
    }
  };

  return (
    <div className="App">
      <input type="text" value={username} onChange={handleInputChange} />
      <button onClick={fetchIssues}>Fetch Issues</button>
      {starredRepositoriesData.map((item) => (
        <Card repo={item} repoName={item.full_name}></Card>
      ))}
    </div>
  );
}

export default App;
