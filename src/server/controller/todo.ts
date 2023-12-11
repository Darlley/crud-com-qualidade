import { NextApiRequest, NextApiResponse } from "next";
import { todoRepository } from "@server/repository/todo";

function getTodo(req: NextApiRequest, res: NextApiResponse) {
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

export const TodoControler = {
    getTodo,
};
