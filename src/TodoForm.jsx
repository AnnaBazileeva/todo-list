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
            <input type='text' name='title' placeholder='enter todo'
                   ref={todoTitleInput} value={workingTodo}
                   onChange={(e)=> setWorkingTodo(e.target.value)}/>
            <button type='submit' disabled={workingTodo===''}>Add Todo</button>
        </form>
    )
}

export default TodoForm

