import { exampleInput } from "@/business/exampleInput";
import { generateDummyData } from "@/business/generators/generateDummyData";
import { Button } from "@/components/ui/button";
import { useDummyData } from "@/zustand/store";
import { useFormContext } from "react-hook-form";

export function ShowExampleButton() {
  const setDummyData = useDummyData((state) => state.setDummyData);
  const setIsGenerating = useDummyData((state) => state.setIsGenerating);
  const setInSyncWithForm = useDummyData((state) => state.setInSyncWithForm);
  const { reset } = useFormContext();

  return (
    <Button
      variant="outline"
      type="button"
      onClick={() => {
        setIsGenerating(true);
        setTimeout(() => {
          const dummyData = generateDummyData(exampleInput);
          setDummyData(dummyData);
          reset({ schemas: exampleInput });
          setInSyncWithForm(true);
          setIsGenerating(false);
        }, 300);
      }}
    >
      Example
    </Button>
  );
}
