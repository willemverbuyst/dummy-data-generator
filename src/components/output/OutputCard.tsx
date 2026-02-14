import { useDummyData } from "@/zustand/store";
import { LoadingOutlined } from "@ant-design/icons";
import { DataDisplay } from "./DataDisplay";
import { InSyncBadge } from "./InSyncBadge";

export function OutputCard() {
  const isGenerating = useDummyData((state) => state.isGenerating);

  return (
    <div className="bg-background relative m-2 rounded-md p-4">
      {isGenerating ? (
        <LoadingOutlined data-testid="spinner" />
      ) : (
        <>
          <InSyncBadge />
          <DataDisplay />
        </>
      )}
    </div>
  );
}
