import { z } from "zod";

// Refer to zod docs for more information
// This basically defines the shape of the form data
export const formSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(2).max(50),
  email: z.string({ required_error: "Email is required" }).email(),
  password: z.string({ required_error: "Password is required" }).min(6),
});
