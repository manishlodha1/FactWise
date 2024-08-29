import './App.css';
import React, { useState, useEffect } from 'react';
import AddCeleb from './component/AddCeleb';
import CelebList from './component/CelebList';
import Header from './component/Header';


function App() {
  let savedTodos;
  const [todos, setTodos] = useState(() => {
     savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const onDelete = (todo) => {
    const updatedTodos = todos.filter((e) => e !== todo);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const addTodo = (first,last, desc,gender,age,dob,country,email) => {
    const sno = todos.length ? todos[todos.length - 1].sno + 1 : 1;
    const newTodo = {
      first: first,
      last:last,
      gender:gender,
      description: desc,
      dob:dob,
      country:country,
      email:email,
      age:age,
      sno: sno
    };
    // console.log("snfnslrjnf");
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  return (
    <>
      <Header title="Factwise" searchBar={true} />
      <AddCeleb addTodo={addTodo} />
      <CelebList todos={todos} onDelete={onDelete} />
    </>
  );
} 

export default App;
