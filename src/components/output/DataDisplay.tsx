import { useDummyData } from "@/zustand/store";

export function DataDisplay() {
  const dummyData = useDummyData((state) => state.dummyData);

  return (
    <pre>
      <code>{JSON.stringify(dummyData, null, 4)}</code>
    </pre>
  );
}
