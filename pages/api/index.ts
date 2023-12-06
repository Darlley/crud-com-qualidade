import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
    request: NextApiRequest, 
    response: NextApiResponse
) {
    console.log(request.headers);
    response.status(200).json({
        message: "Welcome to API"
    })
}