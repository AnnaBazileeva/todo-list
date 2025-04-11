function TodoForm({onAddTodo}) {
    const handleAddTodo = (event) => {
        event.preventDefault();
        console.dir(event.target.title)
    }

    return (
        <form onSubmit={handleAddTodo}>
            <input type='text' name='title' placeholder='enter todo'/>
            <button type='submit'>Add Todo</button>
        </form>
    )
}

export default TodoForm