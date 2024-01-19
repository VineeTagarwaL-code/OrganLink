import * as z from "zod";

export const LoginSchema = z.object({
  password: z.string().max(20, {
    message: "Password shouldnt be that long ?",
  }),
  email: z.string().email({
    message: "Input correct email address",
  }),
});
