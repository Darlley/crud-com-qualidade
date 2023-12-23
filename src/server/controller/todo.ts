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

async function toggleDone(req: NextApiRequest, res: NextApiResponse) {
    const todo_id = req.query.id;

    if (!todo_id || typeof todo_id !== "string") {
        res.status(400).json({
            error: {
                message: "You must to provide a string ID.",
            },
        });

        return;
    }

    try {
        const updatedTodo = await todoRepository.toggleDone(todo_id);
        return res.status(200).json({
            todo: updatedTodo,
        });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(404).json({
                error: {
                    message: error.message + " :(",
                },
            });
        }
    }
}
export const TodoControler = {
    getTodo,
    create,
    toggleDone,
};
