import React, { useState, useEffect } from "react";
import "./App.css";
import { submitNewTodo, loadDemoItems } from "./Actions";
import { useDispatch, useSelector } from "react-redux";
import ItemSubmissionForm from "./ItemSubmissionForm";
import ListWide from "./ListWide";
import ListMobile from "./ListMobile";
import Pagination from "./Pagination";
import { getCurDate } from "./utility";

function App() {
  // *- DEBUG/DEMO: ------------------------*
  const todoId = useSelector((state) => {
    return state.todoId;
  });
  const dispatch = useDispatch();

  const addImportantItem = () => {
    const dummyItem = {
      dateAdded: "2020-09-01T18:44",
      id: todoId,
      completed: false,
      text: "Sample Important Todo",
      important: true,
      expires: null,
    };

    dispatch(submitNewTodo(dummyItem));
  };

  const addDemoItems = () => {
    dispatch(loadDemoItems());
  }

  const addCompleteItem = () => {
    let item = {
      dateAdded: getCurDate(),
      id: todoId,
      completed: true,
      text: "Sample Completed Todo",
      important: false,
      expires: null
    }

    dispatch(submitNewTodo(item))
  }

  const addExpiredItem = () => {
    let item = {
      dateAdded: getCurDate(),
      id: todoId,
      completed: false,
      text: "Sample Expired Todo",
      important: false,
      expires: "2000-01-01T08:00"
    };

    dispatch(submitNewTodo(item));
  }
  // *----------------------------------------*

  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const viewBreakpoint = 720;

  useEffect(() => {
    window.addEventListener("resize", () => {
      setViewportWidth(window.innerWidth);
    });
  }, []);

  return (

    <>
      <div className="DemoBar">
        <p className="DemoBarHeader">Demo Bar »</p>
        <p className="DemoBarItem" onClick={addDemoItems}>Try Demo Items</p>
        <p className="DemoBarItem" onClick={addImportantItem}>Add Important Item</p>
        <p className="DemoBarItem" onClick={addExpiredItem}>Add Expired Item</p>
        <p className="DemoBarItem" onClick={addCompleteItem}>Add Completed Item</p>
      </div>
      <div className="App">

        <h1 className={viewportWidth > viewBreakpoint ? "Header" : "HeaderMobile"}> ➲ To-Do List</h1>

        <div className="AppBody">
          <ItemSubmissionForm mobile={(viewportWidth <= viewBreakpoint)}/>
          <hr className="Divider" />
          {/* <List /> */}
          {viewportWidth > viewBreakpoint ? <ListWide /> : <ListMobile />}
          <hr className="Divider" />
          <Pagination />
        </div>
      </div>
    </>
  );
}

export default App;
