import { Button } from "@/components/ui/button";
import type { UseFieldArrayAppend } from "react-hook-form";
import { defaultSchema, type FormSchema } from "../formSchema";

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
      className="ml-auto"
      title="add-entity"
    >
      Add Entity
    </Button>
  );
}
