import { useDummyData } from "@/zustand/store";
import type { UseFormReset } from "react-hook-form";
import { Button } from "../ui/button";
import { defaultSchema, type FormSchema } from "./formSchema";

export function ResetButton({ reset }: { reset: UseFormReset<FormSchema> }) {
  const clearDummyData = useDummyData((state) => state.clearDummyData);
  const setInSyncWithForm = useDummyData((state) => state.setInSyncWithForm);

  return (
    <Button
      type="button"
      variant="destructive"
      onClick={() => {
        reset({
          schemas: [defaultSchema],
        });
        clearDummyData();
        setInSyncWithForm(true);
      }}
    >
      Reset
    </Button>
  );
}
