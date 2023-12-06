import fs from 'fs';
import { randomUUID } from 'crypto'
// const fs = require('fs')

const DB_FILE_PATH = "./core/db"

interface Todo {
    id: string,
    date: string,
    content: string,
    done: boolean,
    created_at: string,
    updated_at: string,
}

// const todos: Array<Todo> = []

function WRITE_FILE(todos: Array<Todo>){
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify({
        todos, 
        users: []
    }, null, 2))
}

function create(content: string): Todo{
    const todo: Todo = {
        id: randomUUID(),
        date: new Date().toISOString(),
        content: content,
        done: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    }

    // todos.push(todo)
    const todos: Array<Todo> = [
        ...read(),
        todo
    ]

    WRITE_FILE(todos)

    return todo;
}

function read(): Array<Todo>{
    const response = fs.readFileSync(DB_FILE_PATH, "utf-8");
    const data = JSON.parse(response || "{}");

    if(!data.todos){
        return []; // Fail Fast Validation
    }
    
    return data.todos;
}

function update(id: string, partialTodo: Partial<Todo>){
    let updated_todo;
    const todos = read()

    todos.forEach((currentTodo) => {
        if(currentTodo.id === id){
            updated_todo = Object.assign(currentTodo, {
                ...partialTodo,
                updated_at: new Date().toISOString(),
            })
        }
    })

    WRITE_FILE(todos)

    if(!updated_todo){
        throw new Error("Please, provide another ID!");
    }

    return updated_todo;
}

function updateContentByID(id: string, content: string): Todo {
    return update(id, {
        content
    })
}
function updateDoneByID(id: string, done: boolean): Todo {
    return update(id, {
        done
    })
}

function CLEAR_DB(){
    fs.writeFileSync(DB_FILE_PATH, '');
}

CLEAR_DB()
create('Todo 1')
create('Todo 2')

const todo = create('Todo 3')
update(todo.id, {
    content: "New content 2",
    done: true
})

console.log(read())