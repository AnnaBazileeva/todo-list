import { useState, useEffect } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel.jsx";

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
                    <form onSubmit={handleUpdate}>
                        <TextInputWithLabel
                            elementId={`edit-${todo.id}`}
                            label="Edit Todo"
                            value={workingTitle}
                            onChange={handleEdit}
                        />
                        <button type="submit" >
                            Update
                        </button>
                        <button type="button" onClick={handleCancel}>
                            Cancel
                        </button><button  type="button" onClick={handleDelete}>Delete</button>
                    </form>
                ) : (
                    <>
                    <div>
                        <input
                            type="checkbox"
                            checked={todo.isCompleted}
                            onChange={handleToggle}
                        />
                        <span>{todo.title}</span>
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>



                    </>
                )
                }
            </div>
        )}
export default TodoListItem;