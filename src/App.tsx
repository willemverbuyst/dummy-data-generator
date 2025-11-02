import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { createData } from "./business/createData";
import { dummyDataSchemas } from "./business/exampleInput";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "./components/ui/field";
import { Input } from "./components/ui/input";

const formSchema = z.object({
  entity: z
    .string()
    .min(1, "Entity is required")
    .regex(
      /^[A-Z][a-z]*$/,
      "Must start with a capital letter and have lowercase letters only",
    ),
  amount: z.coerce.number().min(1, "Amount must be at least 1"),
});

function App() {
  const [dummyData, setDummyData] = useState<ReturnType<typeof createData>>();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      entity: "",
      amount: 1,
    },
  });

  function handleClick() {
    const data = createData(dummyDataSchemas);
    setDummyData(data);
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <div className="bg-background flex min-h-screen w-screen flex-col items-center gap-8 p-8">
      <h1 className="text-primary p-4 text-center text-5xl font-bold">
        Dummy Data Generator
      </h1>
      <div className="flex gap-4">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Set up Schema</CardTitle>
          </CardHeader>
          <CardContent>
            <form id="form-dummy-data" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <Controller
                  name="entity"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-dummy-data-entity">
                        Entity
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-dummy-data-entity"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter entity name"
                        autoComplete="off"
                      />
                      <FieldDescription>
                        Entity name should be singular and starting with a
                        capital letter, eg. "User"
                      </FieldDescription>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="amount"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-dummy-data-amount">
                        Number of Records
                      </FieldLabel>
                      <Input
                        {...field}
                        type="number"
                        min={1}
                        max={1000}
                        value={
                          typeof field.value === "number" ? field.value : 1
                        }
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        id="form-dummy-data-amount"
                        aria-invalid={fieldState.invalid}
                        autoComplete="off"
                      />
                      <FieldDescription>
                        Number of records to generate for this entity.
                      </FieldDescription>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </form>
          </CardContent>
          <CardFooter>
            <Field orientation="horizontal">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
              >
                Reset
              </Button>
              <Button type="submit" form="form-dummy-data">
                Generate
              </Button>
            </Field>
          </CardFooter>
        </Card>

        <Card className="w-[800px]">
          <CardHeader>
            <CardTitle>Generated Data</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-code-foreground bg-secondary rounded-md p-4 text-wrap">
              <code>{JSON.stringify(dummyData, null, 4)}</code>
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
