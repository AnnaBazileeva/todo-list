import {useRef, useState} from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel.jsx";

function TodoForm({onAddTodo, newTodoTitle, setNewTodoTitle}) {
    const todoTitleInput =useRef('')

    const handleAddTodo = (event) => {
        event.preventDefault();
        if (newTodoTitle.trim() === "") return;

      onAddTodo({ title: newTodoTitle.trim(), isCompleted: false });
      setNewTodoTitle("");
    }

    const handleTitleChange = (event) => {
        setNewTodoTitle(event.target.value);
    };

    return (
        <form onSubmit={handleAddTodo}>
            <TextInputWithLabel
                elementId="todoTitle"
                label="Todo"
                ref={todoTitleInput}
                value={newTodoTitle}
                onChange={handleTitleChange}
            />
            <button type='submit'>Add Todo</button>
        </form>
    )
}

export default TodoForm

