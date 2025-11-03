import { useState } from "react";
import { generateDummyData } from "./business/generators/generateDummyData";
import { GeneratedDataCard } from "./GeneratedDataCard";
import { SetUpSchemaCard } from "./SetUpSchemaCard";

function App() {
  const [dummyData, setDummyData] =
    useState<ReturnType<typeof generateDummyData>>();

  return (
    <div className="bg-background flex min-h-screen w-screen flex-col items-center gap-8 p-8">
      <h1 className="text-primary p-4 text-center text-5xl font-bold">
        Dummy Data Generator
      </h1>
      <div className="flex gap-4">
        <SetUpSchemaCard setDummyData={setDummyData} />
        <GeneratedDataCard dummyData={dummyData} />
      </div>
    </div>
  );
}

export default App;
