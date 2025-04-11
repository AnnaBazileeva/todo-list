function TodoForm({onAddTodo}) {
    const handleAddTodo = (event) => {
        event.preventDefault();
        console.dir(event.target)
    }

    return (
        <form onSubmit={handleAddTodo}>
            <input type='text' name='title' placeholder='enter todo'/>
        </form>
    )
}