import { NextApiRequest, NextApiResponse } from "next";
import { z as zodSchema } from "zod";
import { todoRepository } from "@server/repository/todo";

async function getTodo(req: NextApiRequest, res: NextApiResponse) {
    const query = req.query;
    const page = Number(query.page);
    const limit = Number(query.limit);

    const output = todoRepository.get({
        page,
        limit,
    });

    return res.status(200).json({
        total: output.total,
        pages: output.pages,
        todos: output.todos,
    });
}

const TodoCreateBodySchema = zodSchema.object({
    content: zodSchema.string(),
});
async function create(req: NextApiRequest, res: NextApiResponse) {
    const body = TodoCreateBodySchema.safeParse(req.body);
    if (!body.success) {
        return res.status(400).json({
            error: {
                message: "You need to provide a content to create a Todo.",
                description: body.error.issues,
            },
        });
    }
    const createdTodo = await todoRepository.createdByContent(req.body.content);

    res.status(201).json({
        todo: createdTodo,
    });

    return;
}

export const TodoControler = {
    getTodo,
    create,
};
