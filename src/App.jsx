import React, { useState, useRef, useEffect } from 'react';
import ToDoList from "./TodoList"
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  function handleClearTodos(){
const newTodos = todos.filter(todo => !todo.complete )
setTodos(newTodos)  
}

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  useEffect(() => {
    console.log('Retrieving todos from local storage...');
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    console.log('Stored todos:', storedTodos);
    if (storedTodos && storedTodos.length > 0) {
      console.log('Setting todos to stored value...');
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function handleAddToDo(e){
  const name = todoNameRef.current.value
  if (name === '') return
 setTodos( prevTodos=> {
  return [...prevTodos, {id : uuidv4(), name : name, complete:false}]
 })
  todoNameRef.current.value = null
 }

function handleClickTodo(e){
  if (e.keyCode === 13) {
    handleAddToDo();
  }
}

 
  return ( 
  <>
  <div className =" bg-[url] bg-cover bg-center bg-gradient-to-br overflow-scroll from-blue-500 to-green-500 h-screen flex items-center justify-center h-screen">
  <div className="grid mb-auto grid-cols-1 sm:grid-cols-1 md:grid-cols-1">
  <input ref={todoNameRef} type="text"  onKeyDown={handleClickTodo}  className="border rounded-md mt-2 mb-2 border-gray-300 focus:border-blue-500" placeholder="Enter Todo..." />
  <button onClick={handleAddToDo} className="bg-gradient-to-r mb-2 from-purple-500 to-indigo-600 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-full shadow-lg">Add Todo</button>
  <button  onClick={handleClearTodos} className="bg-gradient-to-r mb-2 from-purple-500 to-indigo-600 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-full shadow-lg">Clear Completed Todos</button>
  <ToDoList toggleTodo={toggleTodo} todos={todos}  />
  <div>{todos.filter(todo => todo.complete == false).length} left to do </div>
  </div>
  
  </div>
  </>
  )
}

export default App
