import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "./components/ui/badge";

export function GeneratedDataCard({
  dummyData,
  upToDate,
}: {
  dummyData: unknown;
  upToDate: boolean;
}) {
  return (
    <div className="bg-background shadow-l relative m-2 rounded-md p-4">
      {!!dummyData && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge
              variant={upToDate ? "default" : "destructive"}
              className="absolute top-2 right-2"
            >
              {upToDate ? "in sync" : "not in sync"}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            {upToDate ? (
              <p>Form and json are in sync</p>
            ) : (
              <div className="flex flex-col gap-2">
                <p>Form and json are out of sync</p>
                <p>Press the Generate button to sync</p>
              </div>
            )}
          </TooltipContent>
        </Tooltip>
      )}
      <pre className="text-code-foreground h-full w-full text-sm text-wrap">
        <code>{dummyData ? JSON.stringify(dummyData, null, 4) : "{}"}</code>
      </pre>
    </div>
  );
}
