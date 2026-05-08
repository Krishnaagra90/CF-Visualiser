import { useEffect, useState } from "react";
function CFHeatmap({ handle }) {
    const [countPerDay, setCountPerDay] = useState({});


    useEffect(() => {
    if (!handle) return;

    async function fetchData() {
        const res = await fetch(`https://codeforces.com/api/user.status?handle=${handle}`);
        const data = await res.json();

        if (data.status !== "OK") return;

        const counts = {};

        data.result.forEach((submission) => {
            if (submission.verdict === "OK") {
                const date = new Date(submission.creationTimeSeconds * 1000);
                const dateString = date.toLocaleDateString("en-CA");

                if (counts[dateString]) {
                    counts[dateString] = counts[dateString] + 1;
                } else {
                    counts[dateString] = 1;
                }
            }
        });

        setCountPerDay(counts);
    }                          

    if (handle) fetchData();

}, [handle]);                  //  useEffect ends


    


    const last365Days = [];
    for (let i = 364; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateString = date.toLocaleDateString("en-CA");
    last365Days.push(dateString);
}

  





function colourMap(count) {
    if (!count) return "#ebedf0";
    if (count <= 2) return "#6fd5efff";
    if (count <= 5) return "#3c567fff";
    if (count <= 9) return "#061a69ff";
    return "#216e39";
  }


return (
    <div style={{ padding: "20px" }}>
      <h3>Submission Heatmap</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "3px" }}>
        {last365Days.map((day) => (
          <div
            key={day}
            title={day + ": " + (countPerDay[day] || 0) + " solved"}
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: colourMap(countPerDay[day]),
              borderRadius: "2px",
            }}
          />
        ))}
      </div>
    </div>
  );
}                            //  CFHeatmap ends here

export default CFHeatmap;
