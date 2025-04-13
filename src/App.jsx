import './App.css'
import {useState} from "react";
import TodoForm from "./TodoForm.jsx";
import TodoList from './TodoList.jsx'

function App() {

    const [todoList, setTodoList] =useState([])
    const addTodo = (title) => {
        const newTodo = {
            title,
            id: Date.now()
        }
        setTodoList([...todoList, newTodo])
    }
        function completeTodo(todoId) {
            const updatedTodos = todoList.map((todo) => {
                if (todo.id === todoId) {
                    return { ...todo, isCompleted: true };
                }
                return todo;
            });
            setTodoList(updatedTodos);
        }



    return (
        <div>
            <h1>My Todos</h1>
            <TodoList todoList={todoList} onCompleteTodo={completeTodo} />
            <TodoForm onAddTodo={addTodo} />

        </div>
    )
}

export default App