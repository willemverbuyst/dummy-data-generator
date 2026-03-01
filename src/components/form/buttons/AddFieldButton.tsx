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
      block
      variant="dashed"
      size="small"
      htmlType="button"
      onClick={() => append(defaultField)}
      aria-label={title}
    >
      {title}
    </Button>
  );
}
