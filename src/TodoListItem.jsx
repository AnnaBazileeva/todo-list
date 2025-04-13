function  TodoListItem({todo, onCompleteTodo}) {

    return (
    <li>
        <form>
            <input
                type='checkbox'
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
            />
        </form>
        {todo.title}
    </li>
    )
}

export default TodoListItem;