import { Button } from "@/components/ui/button";
import { useDummyData } from "@/zustand/store";
import { useFormContext } from "react-hook-form";
import { defaultSchema } from "../formSchema";

export function ResetButton() {
  const clearDummyData = useDummyData((state) => state.clearDummyData);
  const setInSyncWithForm = useDummyData((state) => state.setInSyncWithForm);
  const { reset } = useFormContext();

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
