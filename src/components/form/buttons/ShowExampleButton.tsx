import { exampleInput } from "@/exampleInput";
import { useDummyData } from "@/zustand/store";
import { DatabaseOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { useFormContext } from "react-hook-form";

export function ShowExampleButton() {
  const [messageApi, contextHolder] = message.useMessage();
  const setDummyData = useDummyData((state) => state.setDummyData);
  const setIsGenerating = useDummyData((state) => state.setIsGenerating);
  const setInSyncWithForm = useDummyData((state) => state.setInSyncWithForm);
  const { reset } = useFormContext();

  return (
    <>
      {contextHolder}
      <Button
        type="text"
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
            messageApi.success("Example dummy data has been generated");
          }, 300);
        }}
        aria-label="example-button"
        title="show example"
        style={{ color: "cyan" }}
      >
        <DatabaseOutlined /> Example
      </Button>
    </>
  );
}
