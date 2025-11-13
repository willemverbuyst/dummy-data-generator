import { useDummyData } from "@/zustand/store";
import { DataDisplay } from "./DataDisplay";
import { InSyncBadge } from "./InSyncBadge";
import { Spinner } from "./Spinner";

export function OutputCard() {
  const isGenerating = useDummyData((state) => state.isGenerating);

  return (
    <div className="bg-background shadow-l relative m-2 rounded-md p-4">
      {isGenerating ? (
        <Spinner />
      ) : (
        <>
          <InSyncBadge />
          <DataDisplay />
        </>
      )}
    </div>
  );
}
