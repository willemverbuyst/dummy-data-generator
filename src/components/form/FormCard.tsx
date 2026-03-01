import { useDummyData } from "@/zustand/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Flex, Form, message } from "antd";
import { useEffect } from "react";
import type { Resolver } from "react-hook-form";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import type { z } from "zod";
import { AddEntityButton } from "./buttons/AddEntityButton";
import { GenerateButton } from "./buttons/GenerateButton";
import { ResetButton } from "./buttons/ResetButton";
import { ShowExampleButton } from "./buttons/ShowExampleButton";
import { FormItem } from "./FormItem";
import { defaultSchema, type FormSchema, formSchema } from "./formSchema";

export function FormCard() {
  const [messageApi, contextHolder] = message.useMessage();
  const setDummyData = useDummyData((state) => state.setDummyData);
  const setIsGenerating = useDummyData((state) => state.setIsGenerating);
  const setInSyncWithForm = useDummyData((state) => state.setInSyncWithForm);

  const methods = useForm<FormSchema>({
    resolver: zodResolver(formSchema) as Resolver<FormSchema>,
    defaultValues: {
      schemas: [defaultSchema],
    },
  });

  const { subscribe, handleSubmit, control } = methods;

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

  return (
    <FormProvider {...methods}>
      <Card
        title="Input"
        actions={[
          <AddEntityButton append={appendSchema} key="add-entity" />,
          <ResetButton key="reset" />,
          <ShowExampleButton key="show-example" />,
          <GenerateButton
            handleSubmit={handleSubmit(onSubmit)}
            key="generate"
          />,
        ]}
      >
        {contextHolder}

        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
          <Flex vertical gap="large" style={{ width: "100%" }}>
            {schemas.map((schema, index) => (
              <FormItem
                key={schema.id}
                schemaId={schema.id}
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
