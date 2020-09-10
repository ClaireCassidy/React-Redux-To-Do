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

  let todoId = useSelector((state) => {
    return state.todoId;
  })

  const handleTextAreaChange = (event) => {
    setTodoText(event.target.value);
    getCurDate();
  };

  const handleDatePickerChange = (event) => {
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

