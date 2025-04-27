import { useState } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel.jsx";

    function TodoListItem({ todo, onToggleCompleted }) {
        const [isEditing, setIsEditing] = useState(false);
        const [workingTitle, setWorkingTitle] = useState(todo.title);

        const handleCancel = () => {
            setWorkingTitle(todo.title);
            setIsEditing(false);
        };

        const handleEdit = (event) => {
            setWorkingTitle(event.target.value);
        };

        return (
            <>
                {isEditing ? (
                    <>
                        <TextInputWithLabel
                            elementId={`edit-${todo.id}`}
                            label="Edit Todo"
                            value={workingTitle}
                            onChange={handleEdit}
                        />
                        <button type="button" onClick={handleCancel}>
                            Cancel
                        </button>
                    </>
                ) : (
                    <form>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => onToggleCompleted(todo.id)}
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