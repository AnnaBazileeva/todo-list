import './App.css'
import {useState} from "react";
import TodoForm from "./TodoForm.jsx"

function App() {

    const [todoList, setTodoList] =useState([])
    const addTodo = (title) => {
        const newTodo = {
            title,
            id: Date.now()
        }
        setTodoList([...todoList, newTodo])
    }

    return (
        <div>
            <h1>My Todos</h1>
            <ul>{todoList.map(todo => <li key={todo.id}>{todo.title}</li>)
            }
            </ul>
            <TodoForm onAddTodo={addTodo} />
        </div>
    )
}

export default App