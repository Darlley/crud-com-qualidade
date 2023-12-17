import { z as zodSchema } from "zod";

export const TodoSchema = zodSchema.object({
    id: zodSchema.string().uuid(),
    content: zodSchema.string().min(1),
    date: zodSchema.string().datetime(),
    done: zodSchema.boolean(),
});

export type Todo = zodSchema.infer<typeof TodoSchema>;
