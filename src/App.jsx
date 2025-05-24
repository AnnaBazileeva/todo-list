import styles from './styles/App.module.css'
import {useState, useReducer, useEffect, useCallback} from "react";
import {
    reducer as todosReducer,
    actions as todoActions,
    initialState as initialTodosState,
} from './reducers/todos.reducer.js'

import TodoForm from "./TodoList/TodoForm.jsx";
import TodoList from './TodoList/TodoList.jsx';
import TodosViewForm from "./features/TodosViewForm.jsx";
import errorIcon from './assets/error-icon.png';
import  logo from './assets/note_13650723.png'

function useDebounce(value, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
}

function App() {
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
    const token = `Bearer ${import.meta.env.VITE_PAT}`;

    const [todoListState, dispatch] = useReducer(todosReducer, initialTodosState);

    const debouncedQueryString = useDebounce(todoListState.queryString, 500);
    const [newTodoTitle, setNewTodoTitle] = useState('');

    const encodeUrl = useCallback(() => {
        const baseId = import.meta.env.VITE_BASE_ID;
        const tableName = import.meta.env.VITE_TABLE_NAME;
        let sortQuery = `sort[0][field]=${todoListState.sortField}&sort[0][direction]=${todoListState.sortDirection}`;
        let searchQuery = '';
        if (debouncedQueryString) {
            searchQuery = `&filterByFormula=SEARCH("${debouncedQueryString}",+title)`;
        } return `https://api.airtable.com/v0/${baseId}/${tableName}?${sortQuery}${searchQuery}`
        },[ todoListState.sortField, todoListState.sortDirection, debouncedQueryString ])

    useEffect(() => {
        const fetchTodos = async () => {
            dispatch({ type: todoActions.fetchTodos});
            const fetchUrl = encodeUrl();

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

                dispatch({
                    type: todoActions.loadTodos,
                    records: data.records,
                });
            } catch (error) {
                dispatch({ type: todoActions.setLoadError, error });
            } finally {
                dispatch({ type: todoActions.endRequest });
            }
        };
        fetchTodos();
    }, [encodeUrl]);

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
            dispatch({ type: todoActions.deleteTodo, payload: todoId });
        } catch (error) {
            console.error(error);
            dispatch({ type: todoActions.setLoadError, payload: error.message });
        }
    };

    const addTodo = async (newTodo) => {
        dispatch({ type: todoActions.startRequest});
        const payload = {
            records: [
                {
                    fields: {
                        title: newTodo.title,
                        isCompleted: newTodo.isCompleted ?? false,
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


        try {
            const resp = await fetch(url, options);
            if (!resp.ok) {
                throw new Error(`Error: ${resp.statusText}`);
            }

            const { records } = await resp.json();
            if (!records || !records[0]) {
                console.error("Invalid response from Airtable: no records returned", records);
                return;
            }
            dispatch({
                type: todoActions.addTodo,
                payload: {
                    todo: {
                        id: records[0].id,
                        title: records[0].fields.title,
                        isCompleted: records[0].fields.isCompleted ?? false,
                    },
                },
            });
            setNewTodoTitle('');
        } catch (error) {
            dispatch({
                type: todoActions.setLoadError,
                error,
            });
        } finally {
            dispatch({ type: todoActions.endRequest });
        }
    };

    const handleToggleCompleted = (todoId) => {
        const todo = todoListState.todoList.find(t => t.id === todoId);
        if (todo) {
            updateTodo({ ...todo, isCompleted: !todo.isCompleted });
        }
    };

    const updateTodo = async (editedTodo) => {
        dispatch({ type: todoActions.startRequest });

        const originalTodo = todoListState.todoList.find(t => t.id === editedTodo.id);

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

        try {
            const resp = await fetch(url, options);
            if (!resp.ok) {
                throw new Error(`Error: ${resp.statusText}`);
            }

            const { records } = await resp.json();
            dispatch({
                type: todoActions.updateTodo,
                payload: {
                    todo: {
                        id: records[0].id,
                        title: records[0].fields.title,
                        isCompleted: records[0].fields.isCompleted ?? false,
                    },
                },
            });
        } catch (error) {
            dispatch({
                type: todoActions.setLoadError,
                error,
            });
            dispatch({
                type: todoActions.revertTodo,
                payload: {
                    original: originalTodo,
                },
            });
        } finally {
            dispatch({ type: todoActions.endRequest });
        }
    };

    return (
        <div className={styles.container}>
        <header className={styles.header}>
            <img src={logo} alt="Logo" className={styles.logo} />
            <h1>My Todos</h1>
        </header>
        <main>
            <TodoList todoList={todoListState.todoList} onToggleCompleted={handleToggleCompleted} onUpdateTodo={updateTodo} onDeleteTodo={deleteTodo} isLoading={todoListState.isLoading}/>
            <TodoForm onAddTodo={addTodo} newTodoTitle={newTodoTitle} setNewTodoTitle={(setNewTodoTitle)} />
            <TodosViewForm
                sortField={todoListState.sortField}
                setSortField={(value) => dispatch({ type: todoActions.setSortField, payload: value })}
                sortDirection={todoListState.sortDirection}
                setSortDirection={(value) => dispatch({ type: todoActions.setSortDirection, payload: value })}
                queryString={todoListState.queryString}
                setQueryString={(value) => dispatch({ type: todoActions.setQueryString, payload: value })}
            />
            {todoListState.errorMessage && (<div className={styles.error}>
                <img src={errorIcon} alt="Error" className={styles.errorIcon}/>
                <span>{todoListState.errorMessage}</span>
                    <button onClick={() => dispatch({ type: todoActions.clearError })}>
                        ✖
                    </button>
            </div>
            )}
        </main>
        </div>
    )
}
export default App