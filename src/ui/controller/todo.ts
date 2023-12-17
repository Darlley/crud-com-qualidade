import { todoRepository } from "@ui/repository/todo";
import { Todo } from "@ui/schema/todo";
import { z as zodSchema } from "zod";

interface TodoControllerGetParams {
    page: number;
}
async function get(params: TodoControllerGetParams) {
    return todoRepository.get({
        page: params.page,
        limit: 2,
    });
}

function filterTodosByContent<Todo>(
    todos: Array<Todo & { content: string }>,
    search: string,
): Todo[] {
    const homeTodos = todos.filter((currentTodo) => {
        const searchNormalized = search.toLowerCase();
        const contentNormalized = currentTodo.content.toLowerCase();
        return contentNormalized.includes(searchNormalized);
    });

    return homeTodos;
}

interface TodoControllerCreateParams {
    content?: string;
    onSuccess: (todo: Todo) => void;
    onError: () => void;
}

function create({ content, onSuccess, onError }: TodoControllerCreateParams) {
    const parsedParams = zodSchema.string().nonempty().safeParse(content);
    if (!parsedParams.success) {
        onError();
        return;
    }

    todoRepository
        .createByContent(parsedParams.data)
        .then((newTodo) => {
            onSuccess(newTodo);
        })
        .catch(() => {
            onError();
        });
}

export const todoController = { get, filterTodosByContent, create };
