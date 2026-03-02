import {
  MoonOutlined,
  QuestionCircleOutlined,
  SunOutlined,
} from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Flex,
  Layout,
  Splitter,
  theme,
  Typography,
} from "antd";
import { useState } from "react";
import { InputCard } from "./components/input/InputCard";
import { OutputCard } from "./components/output/OutputCard";

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
            }}
          >
            Dummy Data Generator
          </Typography.Title>

          <Flex gap="small">
            <Button
              htmlType="button"
              type="text"
              onClick={() => setIsDark((prev) => !prev)}
            >
              {isDark ? (
                <SunOutlined style={{ color: "#fff" }} />
              ) : (
                <MoonOutlined style={{ color: "#fff" }} />
              )}
            </Button>

            <Button htmlType="button" type="text">
              <a href="https://github.com/willemverbuyst/dummy-data-generator">
                <QuestionCircleOutlined style={{ color: "#fff" }} />
              </a>
            </Button>
          </Flex>
        </Layout.Header>

        <Layout.Content style={{ padding: "16px" }}>
          <Splitter>
            <Splitter.Panel defaultSize="60%">
              <div style={{ paddingRight: "16px" }}>
                <OutputCard />
              </div>
            </Splitter.Panel>
            <Splitter.Panel defaultSize="40%">
              <div style={{ paddingLeft: "16px" }}>
                <InputCard />
              </div>
            </Splitter.Panel>
          </Splitter>
        </Layout.Content>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
