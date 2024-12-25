import { z } from "zod";

export const MakeRequestSchema = z.object({
    title: z.string().min(4),
    description: z.string().min(10),
    media: z.array(z.string()).min(1),
    status: z.enum(["pending", "accepted", "completed", "cancelled"]),
    userId: z.string(),
});