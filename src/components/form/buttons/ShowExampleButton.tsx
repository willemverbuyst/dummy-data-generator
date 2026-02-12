import { exampleInput } from "@/exampleInput";
import { useDummyData } from "@/zustand/store";
import { Button } from "antd";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

export function ShowExampleButton() {
  const setDummyData = useDummyData((state) => state.setDummyData);
  const setIsGenerating = useDummyData((state) => state.setIsGenerating);
  const setInSyncWithForm = useDummyData((state) => state.setInSyncWithForm);
  const { reset } = useFormContext();

  return (
    <Button
      variant="solid"
      color="pink"
      htmlType="button"
      onClick={async () => {
        setIsGenerating(true);

        // Dynamic import - only load the generator (and faker) when needed
        const { generateDummyData } = await import(
          "@/lib/generators/generateDummyData"
        );

        setTimeout(() => {
          const dummyData = generateDummyData(exampleInput);
          setDummyData(dummyData);
          reset({ schemas: exampleInput });
          setInSyncWithForm(true);
          setIsGenerating(false);
          toast("Example dummy data has been generated");
        }, 300);
      }}
    >
      Example
    </Button>
  );
}
