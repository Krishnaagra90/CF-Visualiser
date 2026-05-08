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
        const ratings = res.result.map((item) => ({
          contest: item.contestName,
          rating: item.newRating,
        }));

        setData(ratings);
      })
      .catch(console.error);

  }, [handle]);

  return (
    <div style={{ width: "90%", height: 400, margin: "auto" }}>

      <h2>Rating Graph</h2>

      <ResponsiveContainer>

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="contest" hide />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="rating"
            stroke="#8884d8"
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default Graphs;