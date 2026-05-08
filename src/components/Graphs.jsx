import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function Graphs({ handle }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!handle) return;

    fetch(`https://codeforces.com/api/user.rating?handle=${handle}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.status !== "OK") {
          setData([]);
          return;
        }

        const ratings = res.result.map((item) => ({
          contest: item.contestName,
          rating: item.newRating,
        }));

        setData(ratings);
      })
      .catch(() => setData([]));
  }, [handle]);

  return (
    <section className="overflow-hidden rounded border border-gray-300 bg-white shadow-sm">
      <div className="border-b border-gray-300 bg-gray-50 px-4 py-2">
        <h2 className="text-sm font-bold text-gray-800">Rating graph</h2>
      </div>

      <div className="h-96 p-4">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
              <XAxis dataKey="contest" hide />
              <YAxis width={48} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="rating"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            No contest rating history found.
          </div>
        )}
      </div>
    </section>
  );
}

export default Graphs;
