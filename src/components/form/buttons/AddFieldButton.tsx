import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import type { FieldValues, UseFieldArrayAppend } from "react-hook-form";
import { defaultField } from "../formSchema";

export function AddFieldButton({
  append,
  title,
}: {
  append: UseFieldArrayAppend<FieldValues, string>;
  title: string;
}) {
  return (
    <Button
      variant="outlined"
      size="small"
      htmlType="button"
      onClick={() => append(defaultField)}
      title={title}
    >
      <PlusOutlined />
    </Button>
  );
}
