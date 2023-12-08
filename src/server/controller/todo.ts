import { NextApiRequest, NextApiResponse } from "next";
import { read } from "@db-crud-todo";

function getTodo(_: NextApiRequest, res: NextApiResponse) {
    const ALL_TODOS = read();
    return res.status(200).json({
        todos: ALL_TODOS,
    });
}

export const TodoControler = {
    getTodo,
};
