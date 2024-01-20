import { z } from "zod";

export const OrganDonationFormSchema = z.object({
  organType: z.enum(["heart", "lung", "kidney", "liver"]),
});