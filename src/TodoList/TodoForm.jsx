import {useRef} from "react";
import styled from "styled-components";
import TextInputWithLabel from "../shared/TextInputWithLabel.jsx";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
    margin: 0 15px;
  text-align: center`

const StyledButton = styled.button`
  padding: 0.5rem;
  font-style: ${(props) => (props.disabled ? "italic" : "normal")};`

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
        <StyledForm onSubmit={handleAddTodo}>
            <TextInputWithLabel
                elementId="todoTitle"
                label="Todo"
                ref={todoTitleInput}
                value={newTodoTitle}
                onChange={handleTitleChange}
            />
            <StyledButton type='submit'>Add Todo</StyledButton>
        </StyledForm>
    )
}

export default TodoForm

