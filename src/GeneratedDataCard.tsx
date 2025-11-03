import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";

export function GeneratedDataCard({ dummyData }: { dummyData: unknown }) {
  return (
    <Card className="w-[800px]">
      <CardHeader>
        <CardTitle>Generated Data</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="text-code-foreground bg-secondary rounded-md p-4 text-sm text-wrap">
          <code>{JSON.stringify(dummyData, null, 4)}</code>
        </pre>
      </CardContent>
    </Card>
  );
}
