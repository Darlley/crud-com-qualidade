import { NextApiRequest, NextApiResponse } from "next";
import { TodoControler } from "@server/controller/todo";

export default function handler(
    request: NextApiRequest,
    response: NextApiResponse,
) {
    if (request.method === "GET") {
        return TodoControler.getTodo(request, response);
    }

    if (request.method === "POST") {
        return TodoControler.create(request, response);
    }

    const METHOD = request.method;
    return response.status(405).json({
        message: `${METHOD} Method Not Allowed`,
    });
}
