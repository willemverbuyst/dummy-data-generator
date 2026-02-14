import { Splitter } from "antd";
import { FormCard } from "./form/FormCard";
import { OutputCard } from "./output/OutputCard";

export function Main() {
  return (
    <div className="flex w-screen">
      <Splitter>
        <Splitter.Panel defaultSize="60%">
          <div className="h-full overflow-y-auto">
            <OutputCard />
          </div>
        </Splitter.Panel>
        <Splitter.Panel defaultSize="40%">
          <div className="h-full overflow-y-auto">
            <FormCard />
          </div>
        </Splitter.Panel>
      </Splitter>
    </div>
  );
}
