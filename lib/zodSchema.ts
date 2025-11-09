import { z } from "zod";

export const CheckoutSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  // email: z.string().email("Invalid email"),
  // phone: z.string().min(1, "Phone number is required").optional(),
  // country: z.string().min(1, "Country is required").optional(),
  // district: z.string().min(1, "District is required").optional(),
});
