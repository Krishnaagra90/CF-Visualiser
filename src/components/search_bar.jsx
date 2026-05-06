import { useState } from "react";

function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Codeforces handle"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ padding: "10px", width: "250px" }}
      />

      <button
        onClick={() => onSearch(input)}
        style={{ padding: "10px", marginLeft: "10px" }}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;