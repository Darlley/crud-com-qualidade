import React, { useEffect, useRef, useState } from "react";
// import { GlobalStylesLive } from '../src/theme/GlobalStylesLive';
import { GlobalStyles } from "@ui/theme/GlobalStyles";
import { todoController } from "@ui/controller/todo";

interface HomeTodo {
    id: string;
    content: string;
    done: boolean;
}
const bg = "https://darlley.github.io/images/header.jpg";

function App() {
    // const [initialLoadComplete, setInitialLoadComplete] = useState(false);
    const initialLoadComplete = useRef(false);
    const [newTodoContent, setNewTodoContent] = useState("");
    const [totalPage, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [todos, setTodos] = useState<HomeTodo[]>([]);
    const homeTodos = todoController.filterTodosByContent<HomeTodo[]>(
        todos,
        search,
    );
    const [isLoading, setIsLoading] = useState(true);
    const hasNoMoreTodos = homeTodos.length === 0 && !isLoading;

    // setTodos(filteredTodos);

    const hasMorePages = totalPage > page;

    useEffect(() => {
        // setInitialLoadComplete(true);
        if (!initialLoadComplete.current) {
            todoController
                .get({ page })
                .then(({ todos, pages }) => {
                    setTodos(todos);
                    setTotalPages(pages);
                })
                .finally(() => {
                    setIsLoading(false);
                    initialLoadComplete.current = true;
                });
        }
    }, [page]);

    return (
        <main>
            {/* <GlobalStylesLive /> */}
            <GlobalStyles themeName="indigo" />
            <header
                style={{
                    backgroundImage: `url('${bg}')`,
                }}
            >
                <div className="typewriter">
                    <h1>O que fazer hoje?</h1>
                </div>
                <form
                    onSubmit={(event) => {
                        event?.preventDefault();
                        todoController.create({
                            content: newTodoContent,
                            onSuccess(todo: HomeTodo) {
                                setTodos((prev) => [todo, ...prev]);
                            },
                            onError() {
                                alert(
                                    "Você precisa ter um conteúdo para criar uma todo.",
                                );
                            },
                        });
                        setNewTodoContent("");
                    }}
                >
                    <input
                        type="text"
                        placeholder="Correr, Estudar..."
                        value={newTodoContent}
                        onChange={function newTodoHandler(event) {
                            setNewTodoContent(event.target.value);
                        }}
                    />
                    <button type="submit" aria-label="Adicionar novo item">
                        +
                    </button>
                </form>
            </header>

            <section>
                <form>
                    <input
                        type="text"
                        placeholder="Filtrar lista atual, ex: Dentista"
                        onChange={(event) => setSearch(event.target.value)}
                        value={search}
                    />
                </form>

                <table border={1}>
                    <thead>
                        <tr>
                            <th align="left">
                                <input type="checkbox" disabled />
                            </th>
                            <th align="left">Id</th>
                            <th align="left">Conteúdo</th>
                            <th />
                        </tr>
                    </thead>

                    <tbody>
                        {homeTodos.map((todo) => (
                            <tr key={todo.id}>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td title={todo.id}>
                                    {todo.id.substring(0, 5)}...
                                </td>
                                <td>{todo.content}</td>
                                <td align="right">
                                    <button data-type="delete">Apagar</button>
                                </td>
                            </tr>
                        ))}

                        {isLoading && (
                            <tr>
                                <td
                                    colSpan={4}
                                    align="center"
                                    style={{ textAlign: "center" }}
                                >
                                    Carregando...
                                </td>
                            </tr>
                        )}

                        {hasNoMoreTodos && (
                            <tr>
                                <td colSpan={4} align="center">
                                    Nenhum item encontrado
                                </td>
                            </tr>
                        )}

                        <tr>
                            <td colSpan={1}>Página {page}</td>
                            <td colSpan={2} align="center">
                                {hasMorePages ? (
                                    <button
                                        data-type="load-more"
                                        onClick={() => {
                                            const nextPage = page + 1;
                                            setPage(nextPage);
                                            setIsLoading(true);

                                            todoController
                                                .get({ page: nextPage })
                                                .then(({ todos, pages }) => {
                                                    setTodos((prev) => [
                                                        ...prev,
                                                        ...todos,
                                                    ]);
                                                    setTotalPages(pages);
                                                })
                                                .finally(() => {
                                                    setIsLoading(false);
                                                });
                                        }}
                                    >
                                        Carregar mais{" "}
                                        <span
                                            style={{
                                                display: "inline-block",
                                                marginLeft: "4px",
                                                fontSize: "1.2em",
                                            }}
                                        >
                                            ↓
                                        </span>
                                    </button>
                                ) : (
                                    <button
                                        disabled={true}
                                        data-type="load-more"
                                        style={{
                                            opacity: "50%",
                                        }}
                                    >
                                        Fim
                                    </button>
                                )}
                            </td>
                            <td colSpan={1} align="right">
                                Total
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </main>
    );
}

export default App;
