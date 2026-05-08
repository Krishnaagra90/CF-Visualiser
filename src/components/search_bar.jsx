import { useState } from "react";

function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  return (
    <div className="flex flex-col gap-3 rounded border border-gray-300 bg-white p-3 shadow-sm sm:flex-row">
      <input
        type="text"
        placeholder="Enter Codeforces handle"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch(input.trim());
        }}
        className="h-10 min-w-0 flex-1 rounded border border-gray-300 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />

      <button
        onClick={() => onSearch(input.trim())}
        className="h-10 rounded border border-gray-500 bg-gradient-to-b from-white to-gray-200 px-5 text-sm font-semibold text-gray-900 transition hover:border-gray-700 hover:from-gray-50 hover:to-gray-300"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
