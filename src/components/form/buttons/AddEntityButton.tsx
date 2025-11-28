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
      className="bg-background shadow-l m-2 ml-auto rounded-md p-4"
      title="add-entity"
    >
      Add Entity
    </Button>
  );
}
