import { useEffect, useState } from "react";

function SolvedStats({ handle }) {
  const [stats, setStats] = useState({});
  const [topicStats, setTopicStats] = useState({});
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
      const topicCount = {};

      for (let sub of data.result) {
        if (sub.verdict !== "OK") continue;

        const id = sub.problem.contestId + sub.problem.index;

        if (!solved.has(id)) {
          solved.add(id);

          const r = sub.problem.rating || "Unrated";
          ratingCount[r] = (ratingCount[r] || 0) + 1;

          for (let tag of sub.problem.tags || []) {
            topicCount[tag] = (topicCount[tag] || 0) + 1;
          }
        }
      }

      setStats(ratingCount);
      setTopicStats(topicCount);
      setTotal(solved.size);
    }

    fetchData();
  }, [handle]);

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Total Solved: {total}</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
          width: "90%",
          margin: "20px auto",
          textAlign: "left",
        }}
      >
        <div style={{ border: "1px solid #ccc", padding: "16px" }}>
          <h4>Problems by Rating</h4>

          {Object.entries(stats)
            .sort(([a], [b]) => {
              if (a === "Unrated") return 1;
              if (b === "Unrated") return -1;
              return Number(a) - Number(b);
            })
            .map(([rating, count]) => (
              <p key={rating}>
                {rating}: {count}
              </p>
            ))}
        </div>

        <div style={{ border: "1px solid #ccc", padding: "16px" }}>
          <h4>Problems by Topic</h4>

          {Object.entries(topicStats)
            .sort(([, a], [, b]) => b - a)
            .map(([topic, count]) => (
              <p key={topic}>
                {topic}: {count}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SolvedStats;
