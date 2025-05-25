import { useState, useEffect } from "react";
import styled from 'styled-components'
import TextInputWithLabel from "../shared/TextInputWithLabel.jsx";
import checkedIcon from '../assets/icons8-checkbox.png';
import uncheckedIcon from '../assets/icons8-uncheckbox.png'


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

const StyledTitle = styled.span`
  flex: 1;`

const StyledIconButton = styled.button`
  background: none;
  border: none;
  padding: 0.25rem;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
  }
`;

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
                        <StyledIconButton onClick={handleToggle}>
                            <img src={todo.isCompleted ? checkedIcon : uncheckedIcon} alt="Toggle Complete" />
                        </StyledIconButton>
                        <StyledTitle>{todo.title}</StyledTitle>
                        <StyledButton onClick={() => setIsEditing(true)}>Edit</StyledButton>
                        <StyledButton onClick={handleDelete}>Delete</StyledButton>
                    </StyledItemWrapper>
                )}
            </div>
        )}
export default TodoListItem;