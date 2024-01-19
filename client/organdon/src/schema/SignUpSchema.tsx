import * as z from "zod";

const roleSchema = z.enum(["individual", "institution"]);

export const SignUpSchema = z.object({
  name: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  contact: z.string().min(10, {
    message: "Contact number must be at least 10 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  state: z.string().min(2, {
    message: "State must be at least 2 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  zipCode: z.string().min(5, {
    message: "Zip code must be at least 5 characters.",
  }),
  role: roleSchema,
  nabh: z
    .string()
    .refine((data) => data.length === 4, {
      message: "The string must be exactly 4 characters long",
    })
    .optional(),
});
