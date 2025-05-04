import './App.css'
import {useState, useEffect} from "react";
import TodoForm from "./TodoList/TodoForm.jsx";
import TodoList from './TodoList/TodoList.jsx'

function App() {

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
    const token = `Bearer ${import.meta.env.VITE_PAT}`;
    const [todoList, setTodoList] =useState([]);
    const [newTodoTitle, setNewTodoTitle] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchTodos = async () => {
            setIsLoading(true);
            const options = {
                method: "GET",
                headers: {
                    "Authorization": token,
                },
            };

            try {
                const resp = await fetch(url, options);

                if (!resp.ok) {
                    throw new Error(`Error: ${resp.statusText}`);
                }

                const data = await resp.json();

                const todos = data.records.map(record => {
                    const todo = {
                        id: record.id,
                        title: record.fields.title || "",
                        completed: record.fields.isCompleted || false,
                    };
                    return todo;
                });

                setTodoList(todos);
            } catch (error) {
                setErrorMessage(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTodos();
    }, []);

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
            {isLoading && <p>Loading...</p>}
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    )
}

export default App