import * as z from "zod";

export const registerFormSchema = z
  .object({
    fullName: z
      .string()
      .min(3, "Full name must be at least 3 characters")
      .max(16, "Full name cannot be longer than 16 characters"),
    email: z.string().email("Invalid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[A-Z]/, "Password must contain at least one big letter.")
      .regex(/[a-z]/, "Password must contain at least one small letter")
      .regex(/[0-9]/, "Password must contain at lesat one number.")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character."
      ),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords must match",
    path: ["repeatPassword"],
  });
