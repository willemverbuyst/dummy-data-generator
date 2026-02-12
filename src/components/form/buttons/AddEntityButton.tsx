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
      variant="solid"
      color="pink"
      htmlType="button"
      onClick={() => append(defaultSchema)}
      className="ml-auto"
      title="add-entity"
    >
      Add Entity
    </Button>
  );
}
