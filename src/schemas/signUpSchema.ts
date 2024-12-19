import { z } from "zod";

export const usernameValidationSchema = z.string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must be at most 20 characters long" })
    .regex(/^[a-zA-Z0-9]+$/, { message: "Username can only contain letters and numbers" })

const signUpSchema = z.object({
    username: usernameValidationSchema,
    email: z.string().email(),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(20, { message: "Password must be at most 20 characters long" }),
    contact: z.string()
        .min(10, { message: "Contact number must be at least 10 digits long" }),
})

export type SignUpSchema = z.infer<typeof signUpSchema>

export default signUpSchema