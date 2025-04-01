import './App.css'
import TodoList from './TodoList';
import TodoForm from "./TodoForm.jsx";
import {useState} from "react";

function App() {

 const [newTodo, setNewTodo] = useState('initialValue')

    return (
        <div>
            <h1>My Todos</h1>
            <TodoForm />
            <p>New todo: {newTodo}</p>
            <TodoList />
        </div>
    )
}

export default App