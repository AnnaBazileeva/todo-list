import TodoListItem from './TodoListItem.jsx'
function TodoList({todoList, onToggleCompleted}) {

    return (
        <ul>{todoList.map(todo => <TodoListItem key={todo.id} todo={todo}onToggleCompleted={onToggleCompleted} />)
        }
        </ul>
    )
}

export default TodoList;