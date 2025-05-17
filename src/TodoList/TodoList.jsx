import TodoListItem from './TodoListItem.jsx'
function TodoList({todoList, onToggleCompleted,onUpdateTodo,onDeleteTodo, isLoading}) {


    if (isLoading) {
        return <p>Todo list loading...</p>;
    }

    if (todoList.length === 0) {
        return <p>No todos available</p>;
    }

    return (
        <div className="todo-list">
        {todoList.map((todo) => (
                    <TodoListItem
                        key={todo.id}
                        todo={todo}
                        onUpdateTodo={onUpdateTodo}
                        onToggleCompleted={onToggleCompleted}
                        onDeleteTodo={onDeleteTodo}
                    />

            ))}
        </div>
    )
}

export default TodoList;