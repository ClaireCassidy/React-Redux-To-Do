import React from 'react';
import './App.css'
import ItemSubmissionForm from './ItemSubmissionForm';
import List from './List';

function App() {
  
  return (
    <div className="App">
      <h1 className="Header">To-Do List</h1>
      <ItemSubmissionForm />
      <List />
    </div>
  );

}

export default App;
