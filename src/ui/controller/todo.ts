async function get() {
    return fetch("/api/todos")
        .then(async (response) => {
            const data = await response.text();
            const todos = JSON.parse(data).todos;
            return todos;
        })
        .catch((error) => {
            console.log(error);
        });
}

export const todoController = { get };
