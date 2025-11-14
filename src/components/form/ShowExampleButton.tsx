import { exampleInput } from "@/business/exampleInput";
import { generateDummyData } from "@/business/generators/generateDummyData";
import { useDummyData } from "@/zustand/store";
import type { UseFormReset } from "react-hook-form";
import { Button } from "../ui/button";
import type { FormSchema } from "./formSchema";

export function ShowExampleButton({
  reset,
}: {
  reset: UseFormReset<FormSchema>;
}) {
  const setDummyData = useDummyData((state) => state.setDummyData);
  const setIsGenerating = useDummyData((state) => state.setIsGenerating);
  const setInSyncWithForm = useDummyData((state) => state.setInSyncWithForm);

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
