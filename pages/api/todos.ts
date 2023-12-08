import { NextApiRequest, NextApiResponse } from "next";
import { TodoControler } from "@server/controller/todo";

export default function handler(
    request: NextApiRequest,
    response: NextApiResponse,
) {
    if (request.method === "GET") {
        TodoControler.getTodo(request, response);
    }

    const METHOD = request.method;
    return response.status(405).json({
        message: `${METHOD} Method Not Allowed`,
    });
}
