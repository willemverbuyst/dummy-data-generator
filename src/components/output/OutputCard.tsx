import { DataDisplay } from "./DataDisplay";
import { InSyncBadge } from "./InSyncBadge";

export function OutputCard() {
  return (
    <div className="bg-background shadow-l relative m-2 rounded-md p-4">
      <InSyncBadge />
      <DataDisplay />
    </div>
  );
}
