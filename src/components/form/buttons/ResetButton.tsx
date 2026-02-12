import { useDummyData } from "@/zustand/store";
import { Button } from "antd";
import { useFormContext } from "react-hook-form";
import { defaultSchema } from "../formSchema";

export function ResetButton() {
  const clearDummyData = useDummyData((state) => state.clearDummyData);
  const setInSyncWithForm = useDummyData((state) => state.setInSyncWithForm);
  const { reset } = useFormContext();

  return (
    <Button
      htmlType="button"
      variant="solid"
      color="danger"
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
