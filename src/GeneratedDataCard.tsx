import { cn } from "./lib/utils";

export function GeneratedDataCard({
  dummyData,
  upToDate,
}: {
  dummyData: unknown;
  upToDate: boolean;
}) {
  return (
    <div className="relative p-4">
      {!!dummyData && (
        <span
          className={cn(
            upToDate ? "bg-green-500" : "bg-red-500",
            "absolute top-2 right-2 flex w-25 items-center justify-center rounded-4xl p-2 text-sm font-semibold text-white",
          )}
        >
          {upToDate ? "in sync" : "not in sync"}
        </span>
      )}
      <pre className="text-code-foreground h-full w-full text-sm text-wrap">
        <code>{dummyData ? JSON.stringify(dummyData, null, 4) : "{}"}</code>
      </pre>
    </div>
  );
}
