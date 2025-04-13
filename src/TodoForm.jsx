import {useRef} from "react";

function TodoForm({onAddTodo}) {
    const todoTitleInput =useRef('')
    const handleAddTodo = (event) => {
        event.preventDefault();
      const title = event.target.title.value;
      onAddTodo(title);
      event.target.title.value = '';
      todoTitleInput.current.focus()
    }

    return (
        <form onSubmit={handleAddTodo}>
            <input type='text' name='title' placeholder='enter todo' ref={todoTitleInput}/>
            <button type='submit'>Add Todo</button>
        </form>
    )
}

export default TodoForm

