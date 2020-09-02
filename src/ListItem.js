import React, { useState } from "react";
import "./ListItem.css";
import { useDispatch } from "react-redux";
import { toggleImportant, deleteItem, toggleComplete, removeExpiry, updateExpiry } from "./Actions";
import { getCurDate, getMaxDate } from "./utility.js";

// action : mark completed

export default function ListItem({ todoItem }) {
  const { dateAdded, id, completed, text, important, expires } = todoItem;

  const dispatch = useDispatch();
  const [expiryPickerActive, setExpiryPickerActive] = useState(false);
  const [selectedExpiryDate, setSelectedExpiryDate] = useState(null);

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
  }

  const handleRemoveCancel = (e) => {
    if (expires) {
      console.log("Expiry Removal Triggered");

      dispatch(removeExpiry(id));
    } else {
      console.log("Cancel Expiry Edit Triggered");


    }

    setSelectedExpiryDate(null);
    setExpiryPickerActive(false);
  }

  const handleExpirySubmission = (e) => {
    console.log("submitted");
    console.log(`${selectedExpiryDate}`);

    dispatch(updateExpiry({id, selectedExpiryDate}))
    setSelectedExpiryDate(null);
    setExpiryPickerActive(false);
  }

  return (
    <div className={"ListItemContainer" + (completed ? " Completed" : "")}>
      <div className="DateContainer">
        <p className="DateAdded">{formatDate(dateAdded)}</p>
      </div>

      <div className="TodoTextContainer">
        <p className="TodoText">{`id: ${id}\ncompleted: ${completed}\n${text}`}</p>
      </div>

      <div className="BottomBar">
        {/* Show the expiry date here if it has one */}
        <div className="ExpiresContainer">
          <p className="ExpiresText">
            {expires ? "Expires " + formatDate(expires) : "(No expiry set)"}
          </p>
          {!expiryPickerActive && <span className="EditExpiryText" onClick={handleEditExpiry}>
            (edit)
          </span>}
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
                <p onClick={handleRemoveCancel}>
                  {expires && "Remove Expiry"}
                  {!expires && "Cancel"}
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
