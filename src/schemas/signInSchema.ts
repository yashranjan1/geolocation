import { z } from "zod";

export const signInSchema = z.object({
    identifier: z.string(),
    password: z.string(),
})

export type SignInSchema = z.infer<typeof signInSchema> 

export default signInSchema;