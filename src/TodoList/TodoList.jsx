import TodoListItem from './TodoListItem.jsx'
function TodoList({todoList, onToggleCompleted, onUpdateTodo}) {

    return (
        <ul>{todoList.map(todo => <TodoListItem key={todo.id} todo={todo} onToggleCompleted={onToggleCompleted} onUpdateTodo={onUpdateTodo}/>)
        }
        </ul>
    )
}

export default TodoList;