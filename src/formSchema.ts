import z from "zod";

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
        fields: z
          .array(
            z.object({
              key: z
                .string()
                .min(1, "Key is required")
                .regex(/^[A-Za-z]+$/, "Key must be alphabetic only"),
              type: z.string().min(1, "Value is required"),
              value: z.union([z.string(), z.number()]).optional(),
            }),
          )
          .nonempty("At least one field is required"),
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
