import { Main } from "@/components/Main";
import {
  MoonOutlined,
  QuestionCircleOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { Button, ConfigProvider, Layout, theme, Typography } from "antd";
import { useState } from "react";

function App() {
  const [isDark, setIsDark] = useState(false);
  const { token } = theme.useToken();

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Layout.Header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography.Title
            level={1}
            style={{
              color: token.colorPrimary,
              marginBottom: 0,
            }}
          >
            Dummy Data Generator
          </Typography.Title>

          <div className="flex gap-2">
            <Button
              htmlType="button"
              onClick={() => setIsDark((prev) => !prev)}
            >
              {isDark ? <SunOutlined /> : <MoonOutlined />}
            </Button>

            <Button>
              <a href="https://github.com/willemverbuyst/dummy-data-generator">
                <QuestionCircleOutlined />
              </a>
            </Button>
          </div>
        </Layout.Header>

        <Main />
      </Layout>
    </ConfigProvider>
  );
}

export default App;
