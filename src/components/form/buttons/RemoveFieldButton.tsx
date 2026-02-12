import { MinusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import type { UseFieldArrayRemove } from "react-hook-form";

export function RemoveFieldButton({
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
      variant="outlined"
      size="small"
      htmlType="button"
      disabled={disabled}
      onClick={() => remove(index)}
      aria-label={title}
      title="Remove Field"
    >
      <MinusOutlined />
    </Button>
  );
}
