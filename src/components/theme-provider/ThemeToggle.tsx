import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTheme } from "./useTheme";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      htmlType="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <SunOutlined data-testid="sun-icon" />
      ) : (
        <MoonOutlined data-testid="moon-icon" />
      )}
    </Button>
  );
}
