const BASE_URL = "http://localhost:3000";

describe("/ - todos feed", () => {
    it("when load, renders the page", () => {
        cy.visit(BASE_URL);
    });

    it.only("when create a new todo, it must appears in the screen", () => {
        cy.intercept("POST", `${BASE_URL}/api/todos`, (request) => {
            request.reply({
                statusCode: 201,
                body: {
                    todo: {
                        id: "f21b18ca-8c9c-40ab-a709-32eed69c5f6d",
                        date: "2023-12-24T01:37:00.214Z",
                        content: "Esta criando a todo",
                        done: false,
                        created_at: "2023-12-24T01:37:00.214Z",
                        updated_at: "2023-12-24T01:37:00.214Z",
                    },
                },
            });
        }).as("createTodo");
        cy.visit(BASE_URL);
        const $inputAddTodo = cy.get("input[name='add-todo']");
        $inputAddTodo.type("Esta criando a todo");
        const $btnAddTodo = cy.get("[aria-label='Adicionar novo item']");
        $btnAddTodo.click();
        cy.get("table > tbody").contains("Esta criando a todo");
    });
});
