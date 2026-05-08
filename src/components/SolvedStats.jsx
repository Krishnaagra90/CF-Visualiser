import { useEffect, useState } from "react";

function getRatingColor(rating) {
  if (rating === "Unrated") return "text-gray-500";

  const value = Number(rating);
  if (value < 1200) return "text-gray-500";
  if (value < 1400) return "text-green-700";
  if (value < 1600) return "text-cyan-600";
  if (value < 1900) return "text-blue-700";
  if (value < 2100) return "text-fuchsia-700";
  if (value < 2400) return "text-orange-500";
  if (value < 3000) return "text-red-600";
  return "text-red-800";
}

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
    <section className="overflow-hidden rounded border border-gray-300 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-300 bg-gray-50 px-4 py-2">
        <h3 className="text-sm font-bold text-gray-800">Solved statistics</h3>
        <span className="text-sm text-gray-600">
          Total solved: <strong className="text-gray-950">{total}</strong>
        </span>
      </div>

      <div className="grid gap-4 p-4 lg:grid-cols-2">
        <div className="overflow-hidden rounded border border-gray-200">
          <h4 className="border-b border-gray-200 bg-gray-50 px-3 py-2 text-sm font-bold text-gray-800">
            Problems by rating
          </h4>

          {Object.entries(stats)
            .sort(([a], [b]) => {
              if (a === "Unrated") return 1;
              if (b === "Unrated") return -1;
              return Number(a) - Number(b);
            })
            .map(([rating, count]) => (
              <div
                key={rating}
                className="flex items-center justify-between border-b border-gray-100 px-3 py-2 text-sm last:border-b-0 even:bg-gray-50"
              >
                <span className={`font-bold ${getRatingColor(rating)}`}>
                  {rating}
                </span>
                <span className="font-semibold text-gray-900">{count}</span>
              </div>
            ))}
        </div>

        <div className="overflow-hidden rounded border border-gray-200">
          <h4 className="border-b border-gray-200 bg-gray-50 px-3 py-2 text-sm font-bold text-gray-800">
            Problems by topic
          </h4>

          {Object.entries(topicStats)
            .sort(([, a], [, b]) => b - a)
            .map(([topic, count]) => (
              <div
                key={topic}
                className="flex items-center justify-between gap-3 border-b border-gray-100 px-3 py-2 text-sm last:border-b-0 even:bg-gray-50"
              >
                <span className="min-w-0 break-words text-gray-700">
                  {topic}
                </span>
                <span className="font-semibold text-gray-900">{count}</span>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default SolvedStats;
