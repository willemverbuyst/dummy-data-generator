import { FileAddOutlined } from "@ant-design/icons";
import { Button } from "antd";
import type { UseFieldArrayAppend } from "react-hook-form";
import { defaultSchema, type FormSchema } from "../formSchema";

export function AddEntityButton({
  append,
}: {
  append: UseFieldArrayAppend<FormSchema, "schemas">;
}) {
  return (
    <Button
      type="text"
      htmlType="button"
      onClick={() => append(defaultSchema)}
      aria-label="add-entity-button"
      title="add entity"
      style={{ color: "purple" }}
    >
      <FileAddOutlined /> Add Entity
    </Button>
  );
}
