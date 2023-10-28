import {z} from "zod";

export const issueSchema = z.object({
    // title: z.string().min(1).max(255),
    title: z.string().min(1, "Title ist required").max(255),
    // description: z.string().min(1)
    description: z.string().min(1, "Description is required")
})