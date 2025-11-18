import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import type { FieldValues, UseFieldArrayAppend } from "react-hook-form";
import { defaultField } from "../formSchema";

export function AddFieldButton({
  append,
}: {
  append: UseFieldArrayAppend<FieldValues, string>;
}) {
  return (
    <Button
      variant="outline"
      size="sm"
      type="button"
      onClick={() => append(defaultField)}
    >
      <PlusIcon />
    </Button>
  );
}
