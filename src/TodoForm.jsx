import {useRef, useState} from "react";


function TodoForm({onAddTodo}) {
    const [workingTodo,setWorkingTodo] = useState('')
    const todoTitleInput =useRef('')

    const handleAddTodo = (event) => {
        event.preventDefault();
      const newTodo = workingTodo;
      onAddTodo(newTodo);
      setWorkingTodo('');
      todoTitleInput.current.focus()
    }

    return (
        <form onSubmit={handleAddTodo}>
            <input type='text' name='title' placeholder='enter todo' ref={todoTitleInput} value={workingTodo}/>
            <button type='submit'>Add Todo</button>
        </form>
    )
}

export default TodoForm

