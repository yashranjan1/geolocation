import { z } from "zod";

export const usernameValidationSchema = z.string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must be at most 20 characters long" })
    .regex(/^[a-zA-Z0-9]+$/, { message: "Username can only contain letters and numbers" })

const signUpSchemaClient = z.object({
    username: usernameValidationSchema,
    email: z.string().email(),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(20, { message: "Password must be at most 20 characters long" }),
    contact: z.string()
        .min(10, { message: "Contact number must be at least 10 digits long" }),
})

const signUpSchemaMechanic = z.object({
    username: usernameValidationSchema,
    email: z.string().email(),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(20, { message: "Password must be at most 20 characters long" }),
    contact: z.string()
        .min(10, { message: "Contact number must be at least 10 digits long" }),
    latitude: z.number().min(-90, { message: "Latitude must be between -90 and 90" }).max(90, { message: "Latitude must be between -90 and 90" }),
    longitude: z.number().min(-180, { message: "Longitude must be between -180 and 180" }).max(180, { message: "Longitude must be between -180 and 180" }),
})

export type SignUpSchemaClient = z.infer<typeof signUpSchemaClient>
export type SignUpSchemaMechanic = z.infer<typeof signUpSchemaMechanic>

export { signUpSchemaClient, signUpSchemaMechanic }