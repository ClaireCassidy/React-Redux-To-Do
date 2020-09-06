import React, { useState } from "react";
import "./ItemSubmissionForm.css";
import { useDispatch, useSelector } from "react-redux";
import { submitNewTodo } from "./Actions";
import { getCurDate, getMaxDate, truncateISO } from "./utility.js"

export default function ItemSubmissionForm() {
  const [todoText, setTodoText] = useState("");
  const [expires, setExpires] = useState(false);
  const [expiryDate, setExpiryDate] = useState(getCurDate());
  const [important, setImportant] = useState(false);

  let todosList = useSelector((state) => {
    return state.todos;
  });
  let todoId = useSelector((state) => {
    return state.todoId;
    //console.log(state.todoId);
  })

  const handleTextAreaChange = (event) => {
    setTodoText(event.target.value);
    //console.log(todosList);
    getCurDate();
  };

  const handleDatePickerChange = (event) => {
    //console.log(event.target.value);
    setExpiryDate(event.target.value);
  };

  const handleSubmission = (e) => {
    let now = new Date();
    now.setTime(now.getTime() - new Date().getTimezoneOffset() * 60 * 1000);
    now = now.toISOString();

    const newTodo = {
      dateAdded: truncateISO(now),
      id: todoId,
      completed: false,
      text: todoText,
      important: important,
      expires: expires ? expiryDate : null,
    };

    setImportant(false);
    setTodoText("");
    setExpiryDate(getCurDate());
    setExpires(false);

    dispatch(submitNewTodo(newTodo));
  };

  const handleImportantToggle = (e) => {
    setImportant((important) => !important);
  };

  const handleExpiresToggle = (e) => {
    setExpires((expires) => !expires);
  };

  const dispatch = useDispatch();

  return (
    <div className="FormContainer">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          //console.log("Submitted");
          handleSubmission(e);
        }}
      >
        <h3 className="SubmitHeader">Submit a new to-do:</h3>
        <div className="SubmissionFormContents">
          <div className="SubmissionFormGroupLeft">
            <textarea
              className="TodoTextEntry"
              value={todoText}
              onChange={handleTextAreaChange}
              placeholder="Today I must ..."
            ></textarea>

            <div className="ExpiryDateContainer">
              <div className="ExpiryCheckboxContainer">
                <label className="ExpiresLabel" htmlFor="checkboxExpires">
                  Expires?
                </label>
                <input
                  className="CheckboxExpires"
                  type="checkbox"
                  id="checkboxExpires"
                  name="checkboxExpires"
                  checked={expires}
                  onChange={handleExpiresToggle}
                />
              </div>

              <input
                className="ExpiryPicker"
                type="datetime-local"
                id="expiry-date"
                name="expiry-date"
                value={expiryDate}
                min={getCurDate()}
                max={getMaxDate()}
                onChange={handleDatePickerChange}
                disabled={!expires}
              />
            </div>
          </div>

          <div className="SubmissionFormGroupRight">
            {/* <p className="ImportantToggle" onClick={handleImportantToggle}>
              Important?{" "}
              <span className="ImportantStar">
                {important && "★"}
                {!important && "☆"}
              </span>
            </p> */}

            <div className="ImportantStarContainer">
              <p className="ImportantToggle" onClick={handleImportantToggle}>
                Important?
              </p>
              <p className="ImportantStar" onClick={handleImportantToggle}>
                {important && "★"}
                {!important && "☆"}
              </p>
            </div>

            <input className="FormSubmit" type="submit" value="Submit" />
          </div>
        </div>
      </form>
    </div>
  );
}

// const getCurDate = () => {
//   let fullDate = new Date();

//   // adjust for daylight savings time
//   fullDate.setTime(
//     fullDate.getTime() - new Date().getTimezoneOffset() * 60 * 1000
//   );
//   fullDate = fullDate.toISOString();

//   const formattedDate = truncateISO(fullDate);

//   // if something hasn't gone wrong
//   if (formattedDate !== fullDate) {
//     return formattedDate;
//   }

//   return "2020-01-01T00:00";
// };

// const getMaxDate = () => {
//   let fullDate = new Date();

//   // adjust for daylight savings time
//   fullDate.setTime(
//     fullDate.getTime() - new Date().getTimezoneOffset() * 60 * 1000
//   );
//   fullDate = fullDate.toISOString();

//   // max date one year ahead
//   const yearFromNow = parseInt(fullDate.substring(0, 4)) + 1;
//   fullDate = `${yearFromNow}${fullDate.substring(4)}`;

//   const formattedDate = truncateISO(fullDate);

//   // if something hasn't gone wrong
//   if (formattedDate !== fullDate) {
//     return formattedDate;
//   }
//   return null;
// };

// truncates the seconds off the ISO string so it'll but formatted for the date picker
// const truncateISO = (isoString) => {
//   let fullDate = isoString;

//   for (let i = fullDate.length - 1; i >= 0; i--) {
//     if (fullDate[i] === ":") {
//       return fullDate.substring(0, i);
//     }
//   }

//   return isoString;
// };
