import { useState, useEffect } from "react";
import styled from 'styled-components'
import TextInputWithLabel from "../shared/TextInputWithLabel.jsx";


const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;`

const StyledButton = styled.button`
  margin-right: 0.5rem;
  padding: 0.25rem 0.5rem;
  font-style: ${({ disabled }) => (disabled ? "italic" : "normal")};`

const StyledItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;`

const StyledCheckbox = styled.input`
  margin-right: 0.5rem;`

const StyledTitle = styled.span`
  flex: 1;`

    function TodoListItem({ todo, onUpdateTodo, onDeleteTodo }) {
        const [isEditing, setIsEditing] = useState(false);
        const [workingTitle, setWorkingTitle] = useState(todo.title);

        useEffect(() => {
            setWorkingTitle(todo?.title || '');
        }, [todo]);

        const handleCancel = () => {
            setWorkingTitle(todo.title);
            setIsEditing(false);
        };

        const handleEdit = (event) => {
            console.log("Editing todo:", event.target.value);
            setWorkingTitle(event.target.value);
        };

        const handleUpdate = (event) => {
            event.preventDefault();

            console.log("Updating todo:", workingTitle);
            onUpdateTodo({ ...todo, title: workingTitle });
            setIsEditing(false);
        };

        const handleToggle = () => {
            onUpdateTodo({ ...todo, isCompleted: !todo.isCompleted });
        };

        const handleDelete = (event) => {
            event.preventDefault();

            onDeleteTodo(todo.id);
        };
        return (
            <div>
                {isEditing ? (
                    <StyledForm onSubmit={handleUpdate}>
                        <TextInputWithLabel
                            elementId={`edit-${todo.id}`}
                            label="Edit Todo"
                            value={workingTitle}
                            onChange={handleEdit}
                        />
                        <StyledButton type="submit" >
                            Update
                        </StyledButton>
                        <StyledButton type="button" onClick={handleCancel}>
                            Cancel
                        </StyledButton>
                        <StyledButton  type="button" onClick={handleDelete}>Delete</StyledButton>
                    </StyledForm>
                ) : (
                    <StyledItemWrapper>
                        <StyledCheckbox
                            type="checkbox"
                            checked={todo.isCompleted}
                            onChange={handleToggle}
                        />
                        <StyledTitle>{todo.title}</StyledTitle>
                        <StyledButton onClick={() => setIsEditing(true)}>Edit</StyledButton>
                        <StyledButton onClick={handleDelete}>Delete</StyledButton>
                    </StyledItemWrapper>
                )}
            </div>
        )}
export default TodoListItem;