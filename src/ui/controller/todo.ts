import { todoRepository } from "@ui/repository/todo";

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
    onSuccess: (todo: any) => void;
    onError: () => void;
}
function create({ content, onSuccess, onError }: TodoControllerCreateParams) {
    if (!content) {
        onError();
        return;
    }

    const todo = {
        id: "1234",
        content,
        date: new Date(),
        done: false,
    };

    onSuccess(todo);
}

export const todoController = { get, filterTodosByContent, create };
