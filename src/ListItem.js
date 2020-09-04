import React, { useState } from "react";
import "./ListItem.css";
import { useDispatch } from "react-redux";
import {
  toggleImportant,
  deleteItem,
  toggleComplete,
  removeExpiry,
  updateExpiry,
  sumbitTextEdit,
  submitNewTodo,
  submitTextEdit
} from "./Actions";
import { getCurDate, getMaxDate } from "./utility.js";

// action : mark completed

export default function ListItem({ todoItem }) {
  const { dateAdded, id, completed, text, important, expires } = todoItem;

  const dispatch = useDispatch();
  const [expiryPickerActive, setExpiryPickerActive] = useState(false);
  const [selectedExpiryDate, setSelectedExpiryDate] = useState(null);
  const [editTodoTextActive, setEditTodoTextActive] = useState(false);
  const [newTodoText, setNewTodoText] = useState(text);

  const handleToggleImportant = (e) => {
    dispatch(toggleImportant(id));
  };

  const handleDelete = (e) => {
    dispatch(deleteItem(id));
  };

  const handleToggleComplete = (e) => {
    dispatch(toggleComplete(id));
  };

  const handleEditExpiry = (e) => {
    console.log("Activated Expiry Edit");
    setExpiryPickerActive(true);
  };

  const handleDatePickerChange = (e) => {
    console.log(e.target.value);
    setSelectedExpiryDate(e.target.value);
  };

  const handleExpiryRemove = (e) => {
    console.log("Expiry Removal Triggered");
    dispatch(removeExpiry(id));

    setSelectedExpiryDate(null);
    setExpiryPickerActive(false);
  };

  const handleCancelExpiryEdit = (e) => {
    console.log("Cancel Expiry Edit Triggered");
    setSelectedExpiryDate(null);
    setExpiryPickerActive(false);
  };

  const handleExpirySubmission = (e) => {
    console.log("submitted");
    console.log(`${selectedExpiryDate}`);

    dispatch(updateExpiry({ id, selectedExpiryDate }));
    setSelectedExpiryDate(null);
    setExpiryPickerActive(false);
  };

  const handleTextEditSubmission = (e) => {
    if (newTodoText.length !== 0) {
      console.log("submitting text edit");
      dispatch(submitTextEdit({id, newTodoText}));
    }

    setEditTodoTextActive(false);
  }

  const handleTextEditCancel = (e) => {
    console.log("Text Edit cancelled");

    setNewTodoText(text);
    setEditTodoTextActive(false);
  }

  const handleEditTextAreaChange = (e) => {
    //console.log("changed: "+e.target.value);
    setNewTodoText(e.target.value);
  }

  return (
    <div className={"ListItemContainer" + (completed ? " Completed" : "") + (important ? " Important" : "")}>
      {/* DATE */}
      <div className="DateContainer">
        <p className="DateAdded">{formatDate(dateAdded)}</p>
      </div>

      {/* TODO BODY */}
      <div className="TodoTextContainer">
        {!editTodoTextActive && (
          <>
            <p
              className="TextEditButton"
              onClick={() => {
                setEditTodoTextActive(true);
              }}
            >
              (edit)
            </p>
            <p className="TodoText">{`id: ${id}\ncompleted: ${completed}\n${text}`}</p>
          </>
        )}
        {editTodoTextActive && (
          // <p> active !</p>
          <>
            <textarea
              className="EditTextTextarea"
              name="EditTodoText"
              rows="10"
              placeholder={text}
              value={newTodoText}
              onChange={handleEditTextAreaChange}
            />
            <div className="EditTextButtonsContainer">
              <button className="SubmitTextButton" onClick={handleTextEditSubmission}>Submit Changes</button>
              <button className="RevertTextButton" onClick={() => setNewTodoText(text)}>Revert</button>
              <button className="CancelTextButton" onClick={handleTextEditCancel}>Cancel</button>
            </div>
          </>
        )}
      </div>

      {/* BUTTONS */}
      <div className="BottomBar">
        {/* Show the expiry date here if it has one */}
        <div className="ExpiresContainer">
          <p className="ExpiresText">
            {expires ? "Expires " + formatDate(expires) : "(No expiry set)"}
          </p>
          <div>
            <p className="EditExpiryText" onClick={handleEditExpiry}>{!expiryPickerActive && "(edit)"}</p>
          </div>
        </div>

        <div className="ButtonBar">
          <div className="ImportantIcon" onClick={handleToggleImportant}>
            {important && "★"}
            {!important && "☆"}
          </div>

          <div className="DeleteIcon" onClick={handleDelete}>
            ✖
          </div>

          <div className="CompletedIcon" onClick={handleToggleComplete}>
            {!completed && "☐"}
            {completed && "☑"}
          </div>
        </div>
      </div>

      <div>
        {expiryPickerActive && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("Submitted");
              handleExpirySubmission(e);
            }}
          >
            <div className="ExpiryEditContainer">
              <div className="ExpiryPickerEditContainer">
                <p className="ExpiryEditText">Select:</p>
                <input
                  className="ExpiryPickerEdit"
                  type="datetime-local"
                  id="expiry-date"
                  name="expiry-date"
                  value={selectedExpiryDate || expires || getCurDate()}
                  min={getCurDate()}
                  max={getMaxDate()}
                  onChange={handleDatePickerChange}
                />
              </div>

              <div className="ExpiryRemoveCancel">
                {expires && (
                  <p
                    className="RemoveExpiryButton"
                    onClick={handleExpiryRemove}
                  >
                    Remove
                  </p>
                )}
                <p
                  className="CancelExpiryEditButton"
                  onClick={handleCancelExpiryEdit}
                >
                  Cancel
                </p>
              </div>

              <button className="ExpiryEditSubmit" type="submit">
                Submit
              </button>
            </div>
          </form>
        )}
      </div>

      {/* <p>{JSON.stringify(todoItem)}</p>
            <p>{`${dateAdded}, ${listIndex}, ${text}, ${important}, ${expires}`}</p> */}
    </div>
  );
}

const formatDate = (rawDate) => {
  const [date, time] = rawDate.split("T");
  const [year, month, day] = date.split("-");
  //console.log(`Date: ${date}, Time: ${time}`);
  //console.log(`Day: ${day}, Month: ${month}, Year: ${year}`);

  return `${day}/${month}/${year}, ${time}`;
};
