import { useState } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel.jsx";

    function TodoListItem({ todo, onToggleCompleted, onUpdateTodo }) {
        const [isEditing, setIsEditing] = useState(false);
        const [workingTitle, setWorkingTitle] = useState(todo.title);

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
            onToggleCompleted(todo.id);
        };

        return (
            <>
                {isEditing ? (
                    <form onSubmit={handleUpdate}>
                        <TextInputWithLabel
                            elementId={`edit-${todo.id}`}
                            label="Edit Todo"
                            value={workingTitle}
                            onChange={handleEdit}
                        />
                        <button type="button" onClick={handleCancel}>
                            Cancel
                        </button>
                        <button type="submit" >
                            Update
                        </button>
                    </form>
                ) : (
                    <form>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={handleToggle}
                        />
                        <span onClick={() => setIsEditing(true)} style={{ cursor: "pointer" }}>
                          {todo.title}
                        </span>
                    </form>
                )}
            </>
        );
    }
export default TodoListItem;