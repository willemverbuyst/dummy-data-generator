import { useDummyData } from "@/zustand/store";
import { UndoOutlined } from "@ant-design/icons";
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
      type="text"
      onClick={() => {
        reset({
          schemas: [defaultSchema],
        });
        clearDummyData();
        setInSyncWithForm(true);
      }}
      aria-label="reset-button"
      title="reset form"
    >
      <UndoOutlined style={{ color: "red" }} />
    </Button>
  );
}
