import React, { useState } from "react";
import "./ListItem.css";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleImportant,
  deleteItem,
  toggleComplete,
  removeExpiry,
  updateExpiry,
  submitTextEdit,
} from "./Actions";
import { getCurDate, getMaxDate } from "./utility.js";

export default function ListItem({ todoItem }) {
  const { dateAdded, id, completed, text, important, expires } = todoItem;

  const dispatch = useDispatch();
  const [expiryPickerActive, setExpiryPickerActive] = useState(false);
  const [selectedExpiryDate, setSelectedExpiryDate] = useState(null);
  const [editTodoTextActive, setEditTodoTextActive] = useState(false);
  const [newTodoText, setNewTodoText] = useState(text);
  const autoDeleteCompleted = useSelector((state) => {
    return state.autoDeleteCompleted;
  });

  const handleToggleImportant = (e) => {
    dispatch(toggleImportant(id));
  };

  const handleDelete = (e) => {
    dispatch(deleteItem(id));
  };

  const handleToggleComplete = (e) => {
    // if we're auto-deleting completed todo's, this should perform exactly as the delete button
    if (autoDeleteCompleted) {
      dispatch(deleteItem(id));
    } else {
      dispatch(toggleComplete(id));
    }
  };

  const handleEditExpiry = (e) => {
    setExpiryPickerActive(true);
  };

  const handleDatePickerChange = (e) => {
    setSelectedExpiryDate(e.target.value);
  };

  const handleExpiryRemove = (e) => {
    dispatch(removeExpiry(id));

    setSelectedExpiryDate(null);
    setExpiryPickerActive(false);
  };

  const handleCancelExpiryEdit = (e) => {
    setSelectedExpiryDate(null);
    setExpiryPickerActive(false);
  };

  const handleExpirySubmission = (e) => {
    dispatch(updateExpiry({ id, selectedExpiryDate }));
    setSelectedExpiryDate(null);
    setExpiryPickerActive(false);
  };

  const handleTextEditSubmission = (e) => {
    if (newTodoText.length !== 0) {
      dispatch(submitTextEdit({ id, newTodoText }));
    }

    setEditTodoTextActive(false);
  };

  const handleTextEditCancel = (e) => {
    setNewTodoText(text);
    setEditTodoTextActive(false);
  };

  const handleEditTextAreaChange = (e) => {
    setNewTodoText(e.target.value);
  };

  return (
    <div
      className={
        "ListItemContainer" +
        (completed ? " Completed" : "") +
        (important ? " Important" : "")
      }
    >
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
            <p className="TodoText">{text.length === 0 ? `( No Text )` : `${text}`}</p>
          </>
        )}
        {editTodoTextActive && (
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
              <button
                className="SubmitTextButton"
                onClick={handleTextEditSubmission}
              >
                Submit Changes
              </button>
              <button
                className="RevertTextButton"
                onClick={() => setNewTodoText(text)}
              >
                Revert
              </button>
              <button
                className="CancelTextButton"
                onClick={handleTextEditCancel}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>

      {/* BUTTONS */}
      <div className="BottomBar">
        {/* Show the expiry date here if it has one */}
        <div className="ExpiresContainer">
          <p className={"ExpiresText "+(isExpired(expires) ? "ExpiredText" : "")}>
            {expires && "Expires " + formatDate(expires)}
            {expires && isExpired(expires) && <span className="Expired"> ! </span>}
            {!expires && "( No expiry set )"}
          </p>
          <div>
            <p className="EditExpiryText" onClick={handleEditExpiry}>
              {!expiryPickerActive && "(edit)"}
            </p>
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
    </div>
  );
}

const formatDate = (rawDate) => {
  const [date, time] = rawDate.split("T");
  const [year, month, day] = date.split("-");

  return `${day}/${month}/${year}, ${time}`;
};

const isExpired = (date) => {
  const dateInUnixTime = Date.parse(date);
  const dateNow = Date.now();

  return (dateNow >= dateInUnixTime);
}