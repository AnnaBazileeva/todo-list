import React from "react";
import TodoForm from "./TodoForm.jsx";
import TodoList from "./TodoList";
import TodosViewForm from "./TodosViewForm";
import styles from "../styles/App.module.css";
import errorIcon from "../assets/error-icon.png";

const TodosPage = ({
                       todoListState,
                       handleToggleCompleted,
                       updateTodo,
                       deleteTodo,
                       addTodo,
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
            <TodoList todoList={todoListState.todoList} onToggleCompleted={handleToggleCompleted}
                      onUpdateTodo={updateTodo} onDeleteTodo={deleteTodo} isLoading={todoListState.isLoading}/>
            <TodoForm onAddTodo={addTodo} newTodoTitle={newTodoTitle} setNewTodoTitle={setNewTodoTitle}/>
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