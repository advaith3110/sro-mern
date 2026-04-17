import { useState } from "react";
import { getShortestRoute } from "../utils/api";

function Home() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    try {
      const res = await getShortestRoute({ start, end });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching route");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Smart Route Optimizer</h1>

      <input
        type="text"
        placeholder="Start Node"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />

      <input
        type="text"
        placeholder="End Node"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
        style={{ marginLeft: "10px" }}
      />

      <br />
      <br />

      <button onClick={handleSubmit}>Find Route</button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Distance: {result.distance}</h3>
          <h3>Path: {result.path.join(" → ")}</h3>
        </div>
      )}
    </div>
  );
}

export default Home;
