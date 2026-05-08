import { useEffect, useState } from "react";

function getHeatmapColor(count) {
  if (!count) return "bg-gray-200";
  if (count <= 2) return "bg-cyan-200";
  if (count <= 5) return "bg-blue-400";
  if (count <= 9) return "bg-blue-800";
  return "bg-green-700";
}

function CFHeatmap({ handle }) {
  const [countPerDay, setCountPerDay] = useState({});

  useEffect(() => {
    if (!handle) return;

    async function fetchData() {
      const res = await fetch(
        `https://codeforces.com/api/user.status?handle=${handle}`
      );
      const data = await res.json();

      if (data.status !== "OK") return;

      const counts = {};

      data.result.forEach((submission) => {
        if (submission.verdict === "OK") {
          const date = new Date(submission.creationTimeSeconds * 1000);
          const dateString = date.toLocaleDateString("en-CA");

          counts[dateString] = (counts[dateString] || 0) + 1;
        }
      });

      setCountPerDay(counts);
    }

    fetchData();
  }, [handle]);

  const last365Days = [];
  for (let i = 364; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    last365Days.push(date.toLocaleDateString("en-CA"));
  }

  return (
    <section className="overflow-hidden rounded border border-gray-300 bg-white shadow-sm">
      <h3 className="border-b border-gray-300 bg-gray-50 px-4 py-2 text-sm font-bold text-gray-800">
        Submission heatmap
      </h3>

      <div className="flex flex-wrap gap-[3px] p-4">
        {last365Days.map((day) => (
          <div
            key={day}
            title={`${day}: ${countPerDay[day] || 0} solved`}
            className={`h-3 w-3 rounded-[2px] ${getHeatmapColor(
              countPerDay[day]
            )}`}
          />
        ))}
      </div>
    </section>
  );
}

export default CFHeatmap;
