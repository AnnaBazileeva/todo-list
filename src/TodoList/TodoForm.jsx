import {useRef, useState} from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel.jsx";

function TodoForm({onAddTodo}) {
    const todoTitleInput =useRef('')
    const [todoTitle, setTodoTitle] = useState('');

    const handleAddTodo = (event) => {
        event.preventDefault();
      onAddTodo(todoTitle);
      todoTitleInput.current.focus()
    }

    const handleTitleChange = (event) => {
        setTodoTitle(event.target.value);
    };

    return (
        <form onSubmit={handleAddTodo}>
            <TextInputWithLabel
                elementId="todoTitle"
                label="Todo"
                ref={todoTitleInput}
                value={todoTitle}
                onChange={handleTitleChange}
            />
            <button type='submit'>Add Todo</button>
        </form>
    )
}

export default TodoForm

