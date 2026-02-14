import { useDummyData } from "@/zustand/store";
import { Tag, Tooltip } from "antd";

export function InSyncBadge() {
  const inSyncWithForm = useDummyData((state) => state.inSyncWithForm);

  return (
    <div className="absolute top-2 right-2">
      <Tooltip
        title={
          inSyncWithForm ? (
            <p>Form and json are in sync</p>
          ) : (
            <div className="flex flex-col gap-2">
              <p>Form and json are out of sync</p>
              <p>Press the Generate button to sync</p>
            </div>
          )
        }
      >
        <Tag variant="solid" color={inSyncWithForm ? "green" : "red"}>
          {inSyncWithForm ? "in sync" : "not in sync"}
        </Tag>
      </Tooltip>
    </div>
  );
}
