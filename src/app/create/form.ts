import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),

  author: z.discriminatedUnion("type", [
    z.object({
      id: z.string(),
      type: z.literal("existing"),
    }),
    z.object({
      name: z.string(),
      pen_name: z.string().optional(),
      about: z.string().optional(),
      type: z.literal("new"),
    }),
  ]),
});
