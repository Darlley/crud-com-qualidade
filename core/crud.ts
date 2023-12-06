import fs from 'fs';
import { randomUUID } from 'crypto'
// const fs = require('fs')

const DB_FILE_PATH = "./core/db"

interface Todo {
    id: string,
    date: string,
    content: string,
    done: boolean
}

// const todos: Array<Todo> = []

function create(content: string){
    const todo: Todo = {
        id: randomUUID(),
        date: new Date().toISOString(),
        content: content,
        done: false
    }

    // todos.push(todo)
    const todos: Array<Todo> = [
        ...read(),
        todo
    ]

    fs.writeFileSync(DB_FILE_PATH, JSON.stringify({
        todos, 
        users: []
    }, null, 2))

    return content;
}

function read(): Array<Todo>{
    const response = fs.readFileSync(DB_FILE_PATH, "utf-8");
    const data = JSON.parse(response || "{}");

    if(!data.todos){
        return []; // Fail Fast Validation
    }
    
    return data.todos;
}


function CLEAR_DB(){
    fs.writeFileSync(DB_FILE_PATH, '');
}

CLEAR_DB()
create('Todo 1')
create('Todo 2')
console.log(read())