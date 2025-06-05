import React from "react";
import TodoForm from "./TodoForm.jsx";
import TodoList from "./TodoList";
import TodosViewForm from "./TodosViewForm";
import styles from "../styles/App.module.css";
import errorIcon from "../assets/error-icon.png";
import {useSearchParams, useNavigate} from "react-router-dom";
import {useEffect} from "react";

const TodosPage = ({
                       todoListState,
                       onToggleCompleted,
                       onUpdateTodo,
                       onDeleteTodo,
                       onAddTodo,
                       newTodoTitle,
                       setNewTodoTitle,
                       setSortField,
                       setSortDirection,
                       setQueryString,
                       clearError,
                   }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const itemsPerPage = 15;
    const currentPage = parseInt(searchParams.get('page') || '1', 10);

    const filteredTodoList = todoListState.todoList;

    const totalPages = Math.ceil(filteredTodoList.length / itemsPerPage);
    const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;
    const currentTodos = filteredTodoList.slice(indexOfFirstTodo, indexOfFirstTodo + itemsPerPage);

    const handlePreviousPage = () => {
        const prevPage = Math.max(currentPage - 1, 1);
        searchParams.set('page', prevPage);
        setSearchParams(searchParams);
    };

    const handleNextPage = () => {
        const nextPage = Math.min(currentPage + 1, totalPages);
        searchParams.set('page', nextPage);
        setSearchParams(searchParams);
    };

    if (!todoListState) return null;

    const navigate = useNavigate();

    useEffect(() => {
        if (totalPages > 0) {
            const isInvalidPage = Number.isNaN(currentPage) || currentPage < 1 || currentPage > totalPages;

            if (isInvalidPage && totalPages > 0) {
                navigate("/");
            }
        }
    }, [currentPage, totalPages, navigate]);

    return (<>
            <TodoList todoList={currentTodos} onToggleCompleted={onToggleCompleted}
                      onUpdateTodo={onUpdateTodo} onDeleteTodo={onDeleteTodo} isLoading={todoListState.isLoading}/>
            <div className={styles.paginationControls}>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                <span>Page {currentPage} of {totalPages || 1}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages || totalPages === 0}>Next</button>
            </div>
            <TodoForm onAddTodo={onAddTodo} newTodoTitle={newTodoTitle} setNewTodoTitle={setNewTodoTitle}/>
            <TodosViewForm
                setSortField={setSortField}
                setSortDirection={setSortDirection}
                setQueryString={setQueryString}
            />
            {todoListState.errorMessage && (<div className={styles.error}>
                    <img src={errorIcon} alt="Error" className={styles.errorIcon}/>
                    <span>{todoListState.errorMessage}</span>
                    <button onClick={clearError}>X</button>
                </div>)}
        </>)
}
export default TodosPage