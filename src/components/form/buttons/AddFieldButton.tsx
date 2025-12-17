import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
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
      variant="outline"
      size="sm"
      type="button"
      onClick={() => append(defaultField)}
      title={title}
    >
      <PlusIcon />
    </Button>
  );
}
