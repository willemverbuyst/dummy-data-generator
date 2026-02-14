import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ThemeToggle } from "./theme-provider/ThemeToggle";

export function Header() {
  return (
    <div>
      <h1 className="text-primary mb-2 text-center text-4xl font-bold">
        Dummy Data Generator
      </h1>
      <div className="absolute top-4 right-4 flex gap-2">
        <ThemeToggle />
        <Button>
          <a href="https://github.com/willemverbuyst/dummy-data-generator">
            <QuestionCircleOutlined />
          </a>
        </Button>
      </div>
    </div>
  );
}
