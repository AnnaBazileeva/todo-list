import TodoListItem from './TodoListItem.jsx'

function TodoList({todoList, onComleteTodo}) {
const filteredTodoList = todoList.filter((todo) => !todo.isCompleted )


    return (
        todoList.length === 0 ? (
            <p>Add todo above to get started</p>
        ) : (

        <ul>{filteredTodoList.map(todo => <TodoListItem key={todo.id} todo={todo} onCompleteTodo={onComleteTodo}/>
            )}
        </ul>
    )
    )
}

export default TodoList;