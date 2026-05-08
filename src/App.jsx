import { useState } from "react";
import SearchBar from "./components/search_bar.jsx";
import ProfileCard from "./components/ProfileCard.jsx";
import Loader from "./components/loader.jsx";
import Error from "./components/error.jsx";
import SolvedStats from "./components/SolvedStats.jsx";
import CFHeatmap from "./components/CFHeatmap.jsx";
import Graphs from "./components/Graphs.jsx";

function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [handle, setHandle] = useState("");

  const fetchUser = async (username) => {
    if (!username) return;

    try {
      setLoading(true);
      setError("");
      setHandle(username);

      const res = await fetch(
        `https://codeforces.com/api/user.info?handles=${username}`
      );
      const data = await res.json();

      if (data.status !== "OK") {
        throw new Error("User not found");
      }

      setUserData(data.result[0]);
    } catch (err) {
      setError(err.message);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 text-gray-900">
      <div className="mx-auto max-w-6xl">
        <header className="mb-5 border-b border-gray-300 pb-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
            <span className="text-red-700">CF</span> Profile Analyzer
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Search a Codeforces handle to view profile, solved stats, heatmap,
            and rating graph.
          </p>
        </header>

        <main className="space-y-5">
          <SearchBar onSearch={fetchUser} />

          <div className="min-h-6">
            {loading && <Loader />}
            {error && <Error message={error} />}
          </div>

          {userData && (
            <div className="space-y-5">
              <ProfileCard user={userData} />
              <SolvedStats handle={handle} />
              <CFHeatmap handle={handle} />
              <Graphs handle={handle} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
