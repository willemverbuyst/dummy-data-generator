import { CheckOutlined } from "@ant-design/icons";
import { Button } from "antd";

export function GenerateButton({ handleSubmit }: { handleSubmit: () => void }) {
  return (
    <Button
      type="text"
      htmlType="submit"
      aria-label="generate-button"
      onClick={handleSubmit}
      title="generate dummy data"
      style={{ color: "primary" }}
    >
      <CheckOutlined /> Generate
    </Button>
  );
}
