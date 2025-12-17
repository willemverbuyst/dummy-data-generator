import { allFieldValueTypes, type Field } from "@/types";
import z from "zod";

const fieldSchema: z.ZodType<Field> = z.lazy(() =>
  z.object({
    key: z
      .string()
      .min(1, "Key is required")
      .regex(/^[A-Za-z]+$/, "Key must be alphabetic only"),
    type: z.enum(allFieldValueTypes),
    value: z.union([z.string(), z.number(), z.array(fieldSchema)]).optional(),
  }),
);

export const formSchema = z.object({
  schemas: z
    .array(
      z.object({
        entity: z
          .string()
          .min(1, "Entity is required")
          .regex(
            /^[A-Z][a-z]*$/,
            "Must start with a capital letter and have lowercase letters only",
          ),
        fields: z.array(fieldSchema).nonempty("At least one field is required"),
        numberOfRecords: z
          .number()
          .min(1, "Number of records must be at least 1"),
      }),
    )
    .superRefine((schemas, ctx) => {
      const seen = new Set<string>();
      schemas.forEach((item, index) => {
        if (seen.has(item.entity)) {
          ctx.addIssue({
            code: "custom",
            message: `Duplicate entity: "${item.entity}"`,
            path: [index, "entity"],
          });
        }
        seen.add(item.entity);
      });
    }),
});

export type FormSchema = z.infer<typeof formSchema>;

export const defaultField: FormSchema["schemas"][number]["fields"][number] = {
  key: "",
  value: "",
  type: "name",
};

export const defaultSchema: FormSchema["schemas"][number] = {
  entity: "",
  fields: [defaultField],
  numberOfRecords: 1 as unknown as number,
};
