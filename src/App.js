import React, { useState, useEffect } from "react";
import "./App.css";
import { submitNewTodo, loadDemoItems } from "./Actions";
import { useDispatch, useSelector } from "react-redux";
import ItemSubmissionForm from "./ItemSubmissionForm";
// import List from "./List";
import ListWide from "./ListWide";
import ListMobile from "./ListMobile";
import Pagination from "./Pagination";
import { getCurDateUnix } from "./utility";

function App() {
  // *- DEBUG/DEMO: ------------------------*
  const [debug, setDebug] = useState(false);
  const todoId = useSelector((state) => {
    return state.todoId;
  });
  const dispatch = useDispatch();

  const addDummyItem = () => {
    const dummyItem = {
      dateAdded: getCurDateUnix(),
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
      dateAdded: getCurDateUnix(),
      id: todoId,
      completed: false,
      text: "Sample Important Todo",
      important: true,
      expires: null,
    };

    dispatch(submitNewTodo(dummyItem));
  };

  //DEMO:
  const addDemoItems = () => {
    // console.log("Adding Demo Items");
    dispatch(loadDemoItems());
  }

  const addCompleteItem = () => {
    // console.log("Adding complete Item");
    let item = {
      dateAdded: getCurDateUnix(),
      id: todoId,
      completed: true,
      text: "Sample Completed Todo",
      important: false,
      expires: null
    }

    dispatch(submitNewTodo(item))
  }

  const addExpiredItem = () => {
    console.log("Adding Expired Item");
    let item = {
      dateAdded: getCurDateUnix(),
      id: todoId,
      completed: false,
      text: "Sample Expired Todo",
      important: false,
      expires: Date.parse("04 Dec 2015 00:12:00 GMT")
    };

    dispatch(submitNewTodo(item));
  }
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const viewBreakpoint = 720;

  useEffect(() => {
    window.addEventListener("resize", () => {
      setViewportWidth(window.innerWidth);
    });
  }, []);

  return (

    // 830 px
    <>
      <div className="DemoBar">
        <p className="DemoBarHeader">Demo Bar »</p>
        <p className="DemoBarItem" onClick={addDemoItems}>Try Demo Items</p>
        <p className="DemoBarItem" onClick={addImportantItem}>Add Important Item</p>
        <p className="DemoBarItem" onClick={addExpiredItem}>Add Expired Item</p>
        <p className="DemoBarItem" onClick={addCompleteItem}>Add Completed Item</p>
      </div>
      <div className="App">
        <h1 className="Header"> ➲ To-Do List</h1>
        {debug && (
          <div className="Debug">
            <p>DEBUG:</p>
            <button onClick={addDummyItem}>Add Dummy Item</button>
            {/* <button onClick={()=>{addDummyItem(20)}}>Add 20x Dummy Item</button> */}
            <button onClick={addImportantItem}>Add Important Item</button>
          </div>
        )}
        <div className="AppBody">
          <ItemSubmissionForm />
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
