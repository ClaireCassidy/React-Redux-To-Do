import React, { useState } from "react";
import "./App.css";
import { submitNewTodo } from "./Actions";
import { useDispatch, useSelector } from "react-redux";
import ItemSubmissionForm from "./ItemSubmissionForm";
import List from "./List";
import Pagination from "./Pagination";

function App() {
  // *- DEBUG: ------------------------*
  const [debug, setDebug] = useState(true);
  const todoId = useSelector((state) => {
    return state.todoId;
  });
  const dispatch = useDispatch();

  const addDummyItem = () => {
    const dummyItem = {
      dateAdded: "2020-09-01T18:44",
      id: todoId,
      completed: false,
      text: "Dummy",
      important: false,
      expires: null,
    };

    dispatch(submitNewTodo(dummyItem));
  };

  const addImportantItem = () => {
    const dummyItem = {
      dateAdded: "2020-09-01T18:44",
      id: todoId,
      completed: false,
      text: "Dummy",
      important: true,
      expires: null,
    };

    dispatch(submitNewTodo(dummyItem));

  }
  // *----------------------------------*

  return (
    <div className="App">
      <h1 className="Header">To-Do List</h1>
      {debug && (
        <div className="Debug">
          <p>DEBUG:</p>
          <button
            onClick={addDummyItem}
          >
            Add Dummy Item
          </button>
          {/* <button onClick={()=>{addDummyItem(20)}}>Add 20x Dummy Item</button> */}
          <button onClick={addImportantItem}>Add Important Item</button>
        </div>
      )}
      <div className="AppBody">
        <ItemSubmissionForm />
        <hr className="Divider" />
        <List />
        <hr className="Divider" />
        <Pagination />
      </div>
    </div>
  );
}

export default App;
