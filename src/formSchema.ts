import z from "zod";

export const formSchema = z.object({
  schemas: z.array(
    z.object({
      entity: z
        .string()
        .min(1, "Entity is required")
        .regex(
          /^[A-Z][a-z]*$/,
          "Must start with a capital letter and have lowercase letters only",
        ),
      fields: z
        .array(
          z.object({
            key: z.string().min(1, "Key is required"),
            value: z.string().min(1, "Value is required"),
          }),
        )
        .nonempty("At least one field is required"),
      amount: z.number().min(1, "Amount must be at least 1"),
    }),
  ),
});

export type FormSchema = z.infer<typeof formSchema>;
