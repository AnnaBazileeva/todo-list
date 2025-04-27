import './App.css'
import {useState} from "react";
import TodoForm from "./TodoList/TodoForm.jsx";
import TodoList from './TodoList/TodoList.jsx'

function App() {

    const [todoList, setTodoList] =useState([]);
    const [newTodoTitle, setNewTodoTitle] = useState("");

    const addTodo = (title) => {
            if (title.trim() === "") return;

        const newTodo = {
            title,
            id: Date.now(),
            completed:false
        }
        setTodoList([...todoList, newTodo]);
        setNewTodoTitle("");
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

    const handleUpdateTodo = (editedTodo) => {
        const updatedTodos = todoList.map((todo) =>
            todo.id === editedTodo.id
                ? { ...editedTodo }
                : todo
        );
        setTodoList(updatedTodos);
    };

    return (
        <div>
            <h1>My Todos</h1>
            <TodoList todoList={todoList} onToggleCompleted={handleToggleCompleted} onUpdateTodo={handleUpdateTodo} />
            <TodoForm onAddTodo={addTodo} newTodoTitle={newTodoTitle} setNewTodoTitle={setNewTodoTitle} />

        </div>
    )
}

export default App