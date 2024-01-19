import { z } from "zod";

export const OrganDonationFormSchema = z.object({
  organType: z.enum(["heart", "lung", "kidney", "liver"]),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  condition: z.enum(["good", "medium", "bad"]),
});