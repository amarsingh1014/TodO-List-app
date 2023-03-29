import React from 'react'

export default function Todo({todo, toggleTodo }) {
  function handleTodoClick(){
    toggleTodo(todo.id)
  }
    return (
    <div>
        <label>
        <input type="checkbox" onChange={handleTodoClick} checked={todo.complete} class="form-checkbox mr-2 h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"></input>
       {todo.name}
        </label>
    </div>
  )
}

