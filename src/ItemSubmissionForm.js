import React, { useState } from "react";
import "./ItemSubmissionForm.css";
import { useDispatch, useSelector } from 'react-redux';
import { submitNewTodo } from './Actions'


export default function ItemSubmissionForm() {
  const [todoText, setTodoText] = useState("");
  const [expiryDate, setExpiryDate] = useState(getCurDate());
  const [important, setImportant] = useState(false);

  let todosList = useSelector((state) => {
    return state.todos;
  })

  const handleTextAreaChange = (event) => {
    setTodoText(event.target.value);
    console.log(todosList);
    getCurDate();
  };

  const handleDatePickerChange = (event) => {
    console.log(event.target.value);
    setExpiryDate(event.target.value);
  }

  const handleImportantToggle = () => {
    setImportant(important => !important);
  }

  const dispatch = useDispatch();

  return (
    <div className="FormContainer">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Submitted");

        //   {
        //     dateAdded: Date.now(),
        //     listIndex: state.list.length,
        //     text: "get milk",
        //     important: true/false,
        //     expires: [Date & time]
        // }

          //let now = new Date()
          const newTodo = {
            dateAdded: truncateISO((new Date()).toISOString()),
            listIndex: todosList.length,
            text: todoText,
            important: important,
            expires: expiryDate
          }

          setImportant(false);
          setTodoText("");
          setExpiryDate(getCurDate());
          
          dispatch(submitNewTodo(newTodo));


        }}
      >
        <textarea value={todoText} onChange={handleTextAreaChange}></textarea>
        <input
          type="datetime-local"
          id="expiry-date"
          name="expiry-date"
          value={expiryDate}
          min={getCurDate()}
          max={getMaxDate()}
          onChange={handleDatePickerChange}
          required
        />
        <p className="ImportantToggle" onClick={handleImportantToggle}>
          {important && "★"}
          {!important && "☆"}
        </p>
        {/* <button className="FormSubmit" type="submit" value="submit"></button> */}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

const getCurDate = () => {

  let fullDate = new Date();

  // adjust for daylight savings time
  fullDate.setTime( fullDate.getTime() - new Date().getTimezoneOffset()*60*1000 );
  fullDate = fullDate.toISOString();

  const formattedDate = truncateISO(fullDate);

  // if something hasn't gone wrong
  if (formattedDate !== fullDate) {
    return formattedDate;
  }

  return "2020-01-01T00:00";
};

const getMaxDate = () => {
  let fullDate = new Date();

  // adjust for daylight savings time
  fullDate.setTime( fullDate.getTime() - new Date().getTimezoneOffset()*60*1000 );
  fullDate = fullDate.toISOString();


  // max date one year ahead
  const yearFromNow = parseInt(fullDate.substring(0,4))+1;
  fullDate = (`${yearFromNow}${fullDate.substring(4)}`);

  const formattedDate = truncateISO(fullDate);

  // if something hasn't gone wrong
  if (formattedDate !== fullDate) {
    return formattedDate;
  }
  return null;
};

// truncates the seconds off the ISO string so it'll but formatted for the date picker
const truncateISO = (isoString) => {
  let fullDate = isoString;

  for (let i = fullDate.length - 1; i >= 0; i--) {
    if (fullDate[i] === ":") {
      return fullDate.substring(0, i);
    }
  }

  return isoString;
};
