import { useState } from "react";
import SearchBar from "./components/search_bar.jsx";
import ProfileCard from "./components/ProfileCard.jsx";
import Loader from "./components/loader.jsx";
import Error from "./components/error.jsx";
import SolvedStats from "./components/SolvedStats.jsx";

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
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>CP Profile Analyzer</h1>

      <SearchBar onSearch={fetchUser} />

      {loading && <Loader />}
      {error && <Error message={error} />}
      {userData && <ProfileCard user={userData} />}
      {userData && <SolvedStats handle={handle} />}
    </div>
  );
}

export default App;