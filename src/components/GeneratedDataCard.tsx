import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDummyData } from "@/zustand/store";
import { Badge } from "./ui/badge";

export function GeneratedDataCard() {
  const dummyData = useDummyData((state) => state.dummyData);
  const inSyncWithForm = useDummyData((state) => state.inSyncWithForm);

  return (
    <div className="bg-background shadow-l relative m-2 rounded-md p-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant={inSyncWithForm ? "default" : "destructive"}
            className="absolute top-2 right-2"
          >
            {inSyncWithForm ? "in sync" : "not in sync"}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          {inSyncWithForm ? (
            <p>Form and json are in sync</p>
          ) : (
            <div className="flex flex-col gap-2">
              <p>Form and json are out of sync</p>
              <p>Press the Generate button to sync</p>
            </div>
          )}
        </TooltipContent>
      </Tooltip>

      <pre className="text-code-foreground h-full w-full text-sm text-wrap">
        <code>{JSON.stringify(dummyData, null, 4)}</code>
      </pre>
    </div>
  );
}
