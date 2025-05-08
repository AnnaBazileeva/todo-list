import './App.css'
import {useState, useEffect} from "react";

import TodoForm from "./TodoList/TodoForm.jsx";
import TodoList from './TodoList/TodoList.jsx';
import TodosViewForm from "./features/TodosViewForm.jsx";

function encodeUrl({ sortField, sortDirection, queryString }) {
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    let searchQuery = '';
    if (queryString) {
        searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
    }

    const baseId = import.meta.env.VITE_BASE_ID;
    const tableName = import.meta.env.VITE_TABLE_NAME;
    return `https://api.airtable.com/v0/${baseId}/${tableName}?${sortQuery}${searchQuery}`;
}

function App() {
    const [queryString, setQueryString] = useState('')
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
    const token = `Bearer ${import.meta.env.VITE_PAT}`;
    const [isSaving, setIsSaving] = useState(false);
    const [todoList, setTodoList] =useState([]);
    const [newTodoTitle, setNewTodoTitle] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [sortField, setSortField] = useState('createdTime');
    const [sortDirection, setSortDirection] = useState('desc')

    useEffect(() => {
        const fetchTodos = async () => {
            setIsLoading(true);
            const fetchUrl = encodeUrl({ sortField, sortDirection, queryString });

            const options = {
                method: "GET",
                headers: {
                    "Authorization": token,
                },
            };

            try {
                const resp = await fetch(fetchUrl, options);

                if (!resp.ok) {
                    throw new Error(`Error: ${resp.statusText}`);
                }

                const data = await resp.json();

                const todos = data.records.map(record => ({
                        id: record.id,
                        title: record.fields.title || "",
                        isCompleted: record.fields.isCompleted || false,
                    }));
                setTodoList(todos);
            } catch (error) {
                setErrorMessage(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTodos();
    }, [sortField, sortDirection, queryString]);

    const deleteTodo = async (todoId) => {
        const options = {
            method: 'DELETE',
            headers: {
                Authorization: token,
            },
        };

        try {
            const deleteUrl = `${url}/${todoId}`;
            const resp = await fetch(deleteUrl, options);
            if (!resp.ok) {
                throw new Error(`Error: ${resp.statusText}`);
            }

            setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
        }
    };

    const addTodo = async (newTodo) => {
        const payload = {
            records: [
                {
                    fields: {
                        title: newTodo.title,
                        isCompleted: newTodo.isCompleted,
                    },
                },
            ],
        };
        const options = {
            method: 'POST',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        };

        setIsSaving(true)

        try {
            const resp = await fetch(url, options);
            if (!resp.ok) {
                throw new Error(`Error: ${resp.statusText}`);
            }

            const { records } = await resp.json();

            const savedTodo = {
                id: records[0].id,
                ...records[0].fields,
            };

            if (!records[0].fields.isCompleted) {
                savedTodo.isCompleted = false;
            }

            setTodoList([...todoList, savedTodo]);
            setNewTodoTitle("");
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
        } finally {
            setIsSaving(false);
        }
    };


    const handleToggleCompleted = (todoId) => {
        setTodoList((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === todoId
                    ? { ...todo, isCompleted: !todo.isCompleted }
                    : todo
            )
        );
    };

    const updateTodo = async (editedTodo) => {
        const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);

        const payload = {
            records: [
                {
                    id: editedTodo.id,
                    fields: {
                        title: editedTodo.title,
                        isCompleted: editedTodo.isCompleted,
                    },
                },
            ],
        };

        const options = {
            method: 'PATCH',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        };

        setIsSaving(true);

        try {
            const resp = await fetch(url, options);
            if (!resp.ok) {
                throw new Error(`Error: ${resp.statusText}`);
            }

            const { records } = await resp.json();

            const updatedTodo = {
                id: records[0].id,
                ...records[0].fields,
            };

            if (!records[0].fields.isCompleted) {
                updatedTodo.isCompleted = false;
            }

            const updatedTodos = todoList.map((todo) =>
                todo.id === updatedTodo.id ? { ...updatedTodo } : todo
            );
            setTodoList(updatedTodos);
        } catch (error) {
            console.error(error);
            setErrorMessage(`${error.message}. Reverting todo...`);

            const revertedTodos = todoList.map((todo) =>
                todo.id === originalTodo.id ? { ...originalTodo } : todo
            );
            setTodoList(revertedTodos);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div>
            <h1>My Todos</h1>
            <TodoList todoList={todoList} onToggleCompleted={handleToggleCompleted} onUpdateTodo={updateTodo} onDeleteTodo={deleteTodo} isLoading={isLoading}/>
            <TodoForm onAddTodo={addTodo} newTodoTitle={newTodoTitle} setNewTodoTitle={setNewTodoTitle} />
            <TodosViewForm
                sortField={sortField}
                setSortField={setSortField}
                sortDirection={sortDirection}
                setSortDirection={setSortDirection}
                queryString={queryString}
                setQueryString={setQueryString}
            />
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    )
}

export default App