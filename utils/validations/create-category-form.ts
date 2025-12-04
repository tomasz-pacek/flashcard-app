import * as z from "zod";

export const createCategoryFormSchema = z.object({
  category: z
    .string()
    .min(3, "Category must be at least 3 characters long")
    .max(128, "Category cannot be longer than 128 characters"),
});
