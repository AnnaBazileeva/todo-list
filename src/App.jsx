import './App.css'
import {useState} from "react";
import TodoForm from "./TodoList/TodoForm.jsx";
import TodoList from './TodoList/TodoList.jsx'

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
            <TodoList todoList={todoList} />
            <TodoForm onAddTodo={addTodo} />

        </div>
    )
}

export default App