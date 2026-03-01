import { useDummyData } from "@/zustand/store";
import { Flex, Tag, Tooltip } from "antd";

export function InSyncBadge() {
  const inSyncWithForm = useDummyData((state) => state.inSyncWithForm);

  return (
    <div>
      <Tooltip
        title={
          inSyncWithForm ? (
            <p>Form and json are in sync</p>
          ) : (
            <Flex vertical gap="small">
              <p>Form and json are out of sync</p>
              <p>Press the Generate button to sync output data</p>
            </Flex>
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
