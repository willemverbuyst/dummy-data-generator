export function GeneratedDataCard({ dummyData }: { dummyData: unknown }) {
  return (
    <pre className="text-code-foreground h-full w-full p-4 text-sm text-wrap">
      <code>{dummyData ? JSON.stringify(dummyData, null, 4) : "{}"}</code>
    </pre>
  );
}
