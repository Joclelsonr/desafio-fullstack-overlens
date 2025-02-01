import { z } from "zod";

export const formSchema = z.object({
  id: z.string().optional(),
  authorId: z.string().optional(),
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(5, {
      message: "Title required at least 5 characters",
    }),
  content: z.string().min(10, {
    message: "Content is required",
  }),
  isPublic: z.boolean().default(false).optional(),
});

export type FormValues = z.infer<typeof formSchema>;
