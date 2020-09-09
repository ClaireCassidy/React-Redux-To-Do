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
import { getCurDateUnix, getFormattedDateFromUnix, getDatePickerStrFromUnix } from "./utility.js";

// action : mark completed

export default function ListItem({ todoItem }) {
  const { dateAdded, id, completed, text, important, expires } = todoItem;

  const dispatch = useDispatch();
  const [expiryPickerActive, setExpiryPickerActive] = useState(false);
  const [selectedExpiryDate, setSelectedExpiryDate] = useState(null);
  const [editTodoTextActive, setEditTodoTextActive] = useState(false);
  const [newTodoText, setNewTodoText] = useState(text);
  const autoDeleteCompleted = useSelector((state) => {
    // console.log("HERE" + state.autoDeleteCompleted);
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
    //console.log("Activated Expiry Edit");
    setExpiryPickerActive(true);
    setSelectedExpiryDate(expires ? expires : getDatePickerStrFromUnix(getCurDateUnix()));
  };

  const handleDatePickerChange = (e) => {
    console.log(e.target.value);
    setSelectedExpiryDate(e.target.value);
  };

  const handleExpiryRemove = (e) => {
    //console.log("Expiry Removal Triggered");
    dispatch(removeExpiry(id));

    setSelectedExpiryDate(null);
    setExpiryPickerActive(false);
  };

  const handleCancelExpiryEdit = (e) => {
    //console.log("Cancel Expiry Edit Triggered");
    setSelectedExpiryDate(null);
    setExpiryPickerActive(false);
  };

  const handleExpirySubmission = (e) => {
    console.log(`Selected Expiry Date: ${selectedExpiryDate}
                  \n New Date(): ${new Date(selectedExpiryDate)}
                  \n As unix: ${Date.parse(new Date(selectedExpiryDate))}`);
    const selectedExpiryDateUnix = Date.parse(new Date(selectedExpiryDate));
    // console.log("Selected Expiry Date: " + selectedExpiryDate + ", Unix: "+selectedExpiryDateUnix);

    // console.log(selectedExpiryDateUnix);
    dispatch(updateExpiry({ id, selectedExpiryDateUnix }));
    setSelectedExpiryDate(null);
    setExpiryPickerActive(false);
  };

  const handleTextEditSubmission = (e) => {
    if (newTodoText.length !== 0) {
      // console.log("submitting text edit");
      dispatch(submitTextEdit({ id, newTodoText }));
    }

    setEditTodoTextActive(false);
  };

  const handleTextEditCancel = (e) => {
    // console.log("Text Edit cancelled");

    setNewTodoText(text);
    setEditTodoTextActive(false);
  };

  const handleEditTextAreaChange = (e) => {
    //console.log("changed: "+e.target.value);
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
        <p className="DateAdded">{getFormattedDateFromUnix(dateAdded)}</p>
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
            {/* <p className="TodoText">{(text.length > 0 ? `${text}`:`(No Text)`)}</p> */}
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
          <p
            className={
              "ExpiresText " + (isExpired(expires) ? "ExpiredText" : "")
            }
          >
            {/* @TODO: Reinstate with getFormattedDateFromUnix() */}
            {expires && "Expires " + getFormattedDateFromUnix(expires)}
            {expires && isExpired(expires) && (
              <span className="Expired"> ! </span>
            )}
            {!expires && "( No expiry set )"}
            {/* {expires ? "Expires " + formatDate(expires) + (isExpired(expires) ? <span className="Expired">"!"</span> : "") : "(No expiry set)"} */}
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
              // console.log("Submitted");
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
                  value={
                    selectedExpiryDate ||
                    (expires && getDatePickerStrFromUnix(expires)) ||
                    getDatePickerStrFromUnix(getCurDateUnix())
                  }
                  // @TODO: Reinstate
                  min={getDatePickerStrFromUnix(getCurDateUnix())}
                  max={getDatePickerStrFromUnix(getCurDateUnix(1, 0, 0))}
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

      {/* {console.log(`                    ${selectedExpiryDate} \n
                    ${expires && getDatePickerStrFromUnix(expires)} \n
                    ${getDatePickerStrFromUnix(getCurDateUnix())}`)} */}

      <p>{JSON.stringify(todoItem)}</p>
      {/*  <p>{`${dateAdded}, ${listIndex}, ${text}, ${important}, ${expires}`}</p> */}
    </div>
  );
}

// const formatUnixDate = (rawDate) => {
//   // console.log("Parsed date: "+Date.parse(rawDate));
//   console.log(`Parsed date: `+(new Date(rawDate).toISOString()));
//   let parsedDate = new Date(rawDate).toISOString();

//   const [date, time] = parsedDate.split("T");
//   const [year, month, day] = date.split("-");
//   //console.log(`Date: ${date}, Time: ${time}`);
//   //console.log(`Day: ${day}, Month: ${month}, Year: ${year}`);

//   return `${day}/${month}/${year}, ${time}`;

//   // return rawDate;
// }

// const formatDate = (rawDate) => {
//   const [date, time] = rawDate.split("T");
//   const [year, month, day] = date.split("-");
//   //console.log(`Date: ${date}, Time: ${time}`);
//   //console.log(`Day: ${day}, Month: ${month}, Year: ${year}`);

//   return `${day}/${month}/${year}, ${time}`;
// };

const isExpired = (date) => {
  const dateInUnixTime = Date.parse(date);
  const dateNow = Date.now();

  return dateNow >= dateInUnixTime;

  console.log(`Date passed: ${dateInUnixTime}, Date now: ${dateNow}`);
};
