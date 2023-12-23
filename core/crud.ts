import fs from "fs";
import { randomUUID } from "crypto";
// const fs = require('fs')

const DB_FILE_PATH = "./core/db";

type UUID = string;

interface Todo {
    id: UUID;
    date: string;
    content: string;
    done: boolean;
    created_at: string;
    updated_at: string;
}

// const todos: Array<Todo> = []

function WRITE_FILE(todos: Array<Todo>) {
    fs.writeFileSync(
        DB_FILE_PATH,
        JSON.stringify(
            {
                todos,
                users: [],
            },
            null,
            2,
        ),
    );
}

export function create(content: string): Todo {
    const todo: Todo = {
        id: randomUUID(),
        date: new Date().toISOString(),
        content: content,
        done: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    };

    // todos.push(todo)
    const todos: Array<Todo> = [...read(), todo];

    WRITE_FILE(todos);

    return todo;
}

export function read(): Array<Todo> {
    const response = fs.readFileSync(DB_FILE_PATH, "utf-8");
    const data = JSON.parse(response || "{}");

    if (!data.todos) {
        return []; // Fail Fast Validation
    }

    return data.todos;
}

export function update(id: UUID, partialTodo: Partial<Todo>) {
    let updated_todo;
    const todos = read();

    todos.forEach((currentTodo) => {
        if (currentTodo.id === id) {
            updated_todo = Object.assign(currentTodo, {
                ...partialTodo,
                updated_at: new Date().toISOString(),
            });
        }
    });

    WRITE_FILE(todos);

    if (!updated_todo) {
        throw new Error("Please, provide another ID!");
    }

    return updated_todo;
}

function updateContentByID(id: UUID, content: string): Todo {
    return update(id, {
        content,
    });
}

function deleteById(id: UUID) {
    const todos = read();

    const todosWithoutOne = todos.filter((currentTodo) => {
        if (currentTodo.id === id) {
            return false;
        }
        return true;
    });

    CLEAR_DB();

    WRITE_FILE(todosWithoutOne);
}

function CLEAR_DB() {
    fs.writeFileSync(DB_FILE_PATH, "");
}

// CLEAR_DB();
// create("Todo 6");
// const secondTodo = create("Todo 2");
// deleteById(secondTodo.id);

// const thirdTodo = create("Todo 3");
// updateContentByID(thirdTodo.id, "Todo 4");

// console.log(read());
