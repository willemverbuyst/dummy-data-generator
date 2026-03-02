import { useDummyData } from "@/zustand/store";
import { Tag, Tooltip } from "antd";

export function InSyncBadge() {
  const inSyncWithForm = useDummyData((state) => state.inSyncWithForm);

  return (
    <div>
      <Tooltip
        title={
          inSyncWithForm ? (
            <p>Form and json are in sync</p>
          ) : (
            <div>
              <p>Form and json are out of sync</p>
              <p>Press the Generate Data button to sync output data</p>
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
