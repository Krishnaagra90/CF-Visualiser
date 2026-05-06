import { useEffect, useState } from "react";

function SolvedStats({ handle }) {
  const [stats, setStats] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!handle) return;

    async function fetchData() {
      const res = await fetch(
        `https://codeforces.com/api/user.status?handle=${handle}`
      );
      const data = await res.json();

      if (data.status !== "OK") return;

      const solved = new Set();
      const ratingCount = {};

      for (let sub of data.result) {
        if (sub.verdict !== "OK") continue;

        const id = sub.problem.contestId + sub.problem.index;

        if (!solved.has(id)) {
          solved.add(id);

          const r = sub.problem.rating || "Unrated";
          ratingCount[r] = (ratingCount[r] || 0) + 1;
        }
      }

      setStats(ratingCount);
      setTotal(solved.size);
    }

    fetchData();
  }, [handle]);

  return (
    <div>
      <h3>Total Solved: {total}</h3>

      {Object.entries(stats).map(([r, c]) => (
        <p key={r}>
          {r}: {c}
        </p>
      ))}
    </div>
  );
}

export default SolvedStats;