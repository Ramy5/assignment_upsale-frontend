import z from "zod";

const filterSchema = z.object({
  title: z.string().optional(),
  type: z.string().optional(),
  director: z.string().optional(),
  budget: z.string().optional(),
  year: z.string().optional(),
});

export default filterSchema;

export type Filter = z.infer<typeof filterSchema>;
