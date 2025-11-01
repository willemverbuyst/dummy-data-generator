import { useState } from "react";
import "./App.css";
import { createData } from "./business/createData";
import { dummyDataSchemas } from "./business/exampleInput";

function App() {
  const [dummyData, setDummyData] = useState<ReturnType<typeof createData>>();

  function handleClick() {
    const data = createData(dummyDataSchemas);
    setDummyData(data);
  }
  return (
    <>
      <h1>Dummy Data Generator</h1>
      <button type="button" onClick={handleClick}>
        Generate
      </button>

      <section>
        <pre>{JSON.stringify(dummyData, null, 4)}</pre>
      </section>
    </>
  );
}

export default App;
