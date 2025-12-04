import * as z from "zod";

export const createCardFormSchema = z.object({
  question: z
    .string()
    .min(3, "Question must be at least 3 characters long")
    .max(128, "Question cannot be longer than 128 characters"),
  answer: z
    .string()
    .min(3, "Answer must be at least 3 characters long")
    .max(128, "Answer cannot be longer than 128 characters"),
});
