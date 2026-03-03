import { exampleInput } from "@/exampleInput";
import { useDummyData } from "@/zustand/store";
import {
  CheckOutlined,
  DatabaseOutlined,
  FileAddOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Flex, Form, message } from "antd";
import { useEffect } from "react";
import type { Resolver } from "react-hook-form";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import type { z } from "zod";
import { Entity } from "./Entity";
import { defaultSchema, type FormSchema, formSchema } from "./form/formSchema";

export function InputCard() {
  const [messageApi, contextHolder] = message.useMessage();
  const clearDummyData = useDummyData((state) => state.clearDummyData);
  const setDummyData = useDummyData((state) => state.setDummyData);
  const setIsGenerating = useDummyData((state) => state.setIsGenerating);
  const setInSyncWithForm = useDummyData((state) => state.setInSyncWithForm);

  const methods = useForm<FormSchema>({
    resolver: zodResolver(formSchema) as Resolver<FormSchema>,
    defaultValues: {
      schemas: [defaultSchema],
    },
  });

  const { subscribe, handleSubmit, control, reset } = methods;

  useEffect(() => {
    const callback = subscribe({
      formState: {
        touchedFields: true,
      },
      callback: () => {
        setInSyncWithForm(false);
      },
    });

    return () => callback();
  }, [subscribe, setInSyncWithForm]);

  const {
    fields: schemas,
    remove: removeSchema,
    append: appendSchema,
  } = useFieldArray({
    control,
    name: "schemas",
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsGenerating(true);

    // Dynamic import - only load the generator (and faker) when needed
    const { generateDummyData } = await import(
      "@/lib/generators/generateDummyData"
    );

    setTimeout(() => {
      const dummyData = generateDummyData(data.schemas);
      setDummyData(dummyData);
      setInSyncWithForm(true);
      setIsGenerating(false);
      messageApi.success("Dummy data has been generated");
    }, 300);
  }

  function onReset() {
    reset({
      schemas: [defaultSchema],
    });
    clearDummyData();
    setInSyncWithForm(true);
  }

  async function onShowExample() {
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
  }

  function onAppend() {
    appendSchema(defaultSchema);
  }

  return (
    <FormProvider {...methods}>
      <Card
        title="Input"
        actions={[
          <Button
            key="add-entity"
            type="text"
            htmlType="button"
            aria-label="add-entity-button"
            onClick={onAppend}
            style={{ color: "purple" }}
          >
            <FileAddOutlined /> Add Entity
          </Button>,
          <Button
            key="reset"
            type="text"
            htmlType="button"
            aria-label="reset-button"
            onClick={onReset}
            style={{ color: "red" }}
          >
            <UndoOutlined /> Reset Form
          </Button>,
          <Button
            key="show-example"
            type="text"
            htmlType="button"
            onClick={onShowExample}
            aria-label="show-example-button"
            style={{ color: "cyan" }}
          >
            <DatabaseOutlined /> Show Example
          </Button>,
          <Button
            key="generate"
            type="text"
            htmlType="submit"
            aria-label="generate-data-button"
            onClick={handleSubmit(onSubmit)}
            style={{ color: "primary" }}
          >
            <CheckOutlined /> Generate Data
          </Button>,
        ]}
      >
        {contextHolder}

        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          // style={{ maxWidth: "600px" }}
        >
          <Flex vertical gap="large" style={{ width: "100%" }}>
            {schemas.map((schema, index) => (
              <Entity
                key={schema.id}
                index={index}
                removeSchema={removeSchema}
                schemasLength={schemas.length}
              />
            ))}
          </Flex>
        </Form>
      </Card>
    </FormProvider>
  );
}
