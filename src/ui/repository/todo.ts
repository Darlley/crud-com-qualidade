import { z as zodSchema } from "zod";
import { Todo, TodoSchema } from "@ui/schema/todo";

interface TodoRepositoryGetParams {
    page: number;
    limit: number;
}
interface TodoRepositoryGetOutput {
    todos: Todo[];
    total: number;
    pages: number;
}

function get({
    page,
    limit,
}: TodoRepositoryGetParams): Promise<TodoRepositoryGetOutput> {
    return fetch(`/api/todos?page=${page}&limit=${limit}`).then(
        async (respostaDoServidor) => {
            const data = await respostaDoServidor.text();
            const responseParsed = parseTodosFromServer(JSON.parse(data));
            // const ALL_TODOS = todosFromServer;
            // const startIndex = (page - 1) * limit;
            // const endIndex = page * limit;
            // const paginatedTodos = ALL_TODOS.slice(startIndex, endIndex);
            // const totalPages = Math.ceil(ALL_TODOS.length / limit);
            return {
                todos: responseParsed.todos,
                total: responseParsed.total,
                pages: responseParsed.pages,
            };
        },
    );
}

export async function createByContent(content: string): Promise<Todo> {
    const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            content,
        }),
    });

    if (response.ok) {
        const serverResponse = await response.json();
        const ServerResponseSchema = zodSchema.object({
            todo: TodoSchema,
        });
        const serverResponseParsed =
            ServerResponseSchema.safeParse(serverResponse);
        if (!serverResponseParsed.success) {
            throw new Error("Failed to create TODO: ");
        }

        const todo = serverResponseParsed.data.todo;
        return todo;
    }

    throw new Error("Failed to create TODO: ");
}

async function toggleDone(todoId: string) {
    const response = await fetch(`/api/todos/${todoId}/toggle-done`, {
        method: "PUT",
    });

    if (response.ok) {
        const serverResponse = await response.json();
        const ServerResponseSchema = zodSchema.object({
            todo: TodoSchema,
        });
        const serverResponseParsed =
            ServerResponseSchema.safeParse(serverResponse);
        if (!serverResponseParsed.success) {
            throw new Error(`Failed to updated TODO id: ${todoId}`);
        }

        const updatedTodo = serverResponseParsed.data.todo;
        return updatedTodo;
    }

    throw new Error("Server error");
}

async function deleteById(todoId: string) {
    const response = await fetch(`/api/todos/${todoId}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete");
    }
}

export const todoRepository = {
    get,
    createByContent,
    toggleDone,
    deleteById,
};

// interface Todo {
//     id: string;
//     content: string;
//     date: Date;
//     done: boolean;
// }

function parseTodosFromServer(responseBody: unknown): {
    total: number;
    pages: number;
    todos: Array<Todo>;
} {
    if (
        responseBody !== null &&
        typeof responseBody === "object" &&
        "todos" in responseBody &&
        "total" in responseBody &&
        "pages" in responseBody &&
        Array.isArray(responseBody.todos)
    ) {
        return {
            total: Number(responseBody.total),
            pages: Number(responseBody.pages),
            todos: responseBody.todos.map((todo: unknown) => {
                if (todo === null && typeof todo !== "object") {
                    throw new Error("Invalid todo from API");
                }

                const { id, content, done, date } = todo as {
                    id: string;
                    content: string;
                    done: string;
                    date: string;
                };

                return {
                    id,
                    content,
                    done: String(done).toLowerCase() === "true",
                    date: date,
                };
            }),
        };
    }
    return {
        pages: 1,
        total: 0,
        todos: [],
    };
}
