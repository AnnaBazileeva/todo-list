import './App.css'
import {useState} from "react";
import TodoForm from "./TodoList/TodoForm.jsx";
import TodoList from './TodoList/TodoList.jsx'

function App() {

    const [todoList, setTodoList] =useState([])
    const addTodo = (title) => {
        const newTodo = {
            title,
            id: Date.now(),
            completed:false
        }
        setTodoList([...todoList, newTodo])
    }

    const handleToggleCompleted = (todoId) => {
        setTodoList((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === todoId
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        );
    };

    return (
        <div>
            <h1>My Todos</h1>
            <TodoList todoList={todoList} onToggleCompleted={handleToggleCompleted} />
            <TodoForm onAddTodo={addTodo} />

        </div>
    )
}

export default App