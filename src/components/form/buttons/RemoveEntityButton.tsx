import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import type { UseFieldArrayRemove } from "react-hook-form";

export function RemoveEntityButton({
  disabled,
  remove,
  index,
  title,
}: {
  disabled: boolean;
  remove: UseFieldArrayRemove;
  index: number;
  title: string;
}) {
  return (
    <Button
      size="small"
      htmlType="button"
      disabled={disabled}
      onClick={() => remove(index)}
      title="Remove Entity"
      aria-label={title}
    >
      <DeleteOutlined />
    </Button>
  );
}
