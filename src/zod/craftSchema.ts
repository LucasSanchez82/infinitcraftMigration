import { z } from "zod";

const recipe = z.object({
    text: z.string(),
    emoji: z.string(),
    discovered: z.boolean(),
})
export const craftSchema = z.object({
    recipe1: recipe,
    recipe2: recipe,
});