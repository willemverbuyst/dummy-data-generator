import type { UseFieldArrayAppend } from "react-hook-form";
import { Button } from "../ui/button";
import { defaultSchema, type FormSchema } from "./formSchema";

export function AddEntityButton({
  append,
}: {
  append: UseFieldArrayAppend<FormSchema, "schemas">;
}) {
  return (
    <Button
      type="button"
      variant="secondary"
      onClick={() => append(defaultSchema)}
    >
      Add Entity
    </Button>
  );
}
