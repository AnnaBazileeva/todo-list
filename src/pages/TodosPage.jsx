import React from "react";
import TodoForm from "./TodoForm.jsx";
import TodoList from "./TodoList";
import TodosViewForm from "./TodosViewForm";
import styles from "../styles/App.module.css";
import errorIcon from "../assets/error-icon.png";

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
    if (!todoListState) return null;

    return (
        <>
            <TodoList todoList={todoListState.todoList} onToggleCompleted={onToggleCompleted}
                      onUpdateTodo={onUpdateTodo} onDeleteTodo={onDeleteTodo} isLoading={todoListState.isLoading}/>
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
                </div>
            )}
        </>
    )
}
export default TodosPage