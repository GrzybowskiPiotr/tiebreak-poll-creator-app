import * as z from "zod";

export const createPollSchema = z.object({
  title: z.string().trim().min(1).max(120),
  pollType: z.enum(["single", "multiple"]),
  options: z
    .array(z.object({name: z.string().trim().min(3).max(100)}))
    .min(2)
    .max(10),
  closeAt: z.iso.datetime().refine((value) => new Date(value) > new Date(), {
    message: "Poll closing date must be in the future",
  }),
  suggestionsEnabled: z.boolean(),
});

export type CreatePollInput = z.infer<typeof createPollSchema>;
