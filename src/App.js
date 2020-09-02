import React, { useState } from "react";
import "./App.css";
import ItemSubmissionForm from "./ItemSubmissionForm";
import List from "./List";

function App() {

  const [debug, setDebug] = useState(true);

  return (
    <div className="App">
      <h1 className="Header">To-Do List</h1>
      {debug && 
        <div className="Debug">
          <p>DEBUG:</p>
          <button>Add Dummy Item</button>
        </div>
      }
      <div className="AppBody">
        <ItemSubmissionForm />
        <hr className="Divider"/>
        <List />
      </div>
    </div>
  );
}

export default App;
