import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { SetUpSchemaCard } from "./form/SetUpSchemaCard";
import { OutputCard } from "./output/OutputCard";

export function Main() {
  return (
    <div className="flex w-screen">
      <ResizablePanelGroup direction="horizontal" className="horizontal p-2">
        <ResizablePanel defaultSize={60}>
          <div className="h-full overflow-y-auto">
            <OutputCard />
          </div>
        </ResizablePanel>
        <ResizableHandle className="bg-dark" />
        <ResizablePanel defaultSize={40}>
          <div className="h-full overflow-y-auto">
            <SetUpSchemaCard />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
