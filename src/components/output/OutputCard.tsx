import { useDummyData } from "@/zustand/store";
import { Card, Spin } from "antd";
import { DataDisplay } from "./DataDisplay";
import { InSyncBadge } from "./InSyncBadge";

export function OutputCard() {
  const isGenerating = useDummyData((state) => state.isGenerating);

  return (
    <Card title="Output" extra={<InSyncBadge />}>
      {isGenerating ? <Spin /> : <DataDisplay />}
    </Card>
  );
}
