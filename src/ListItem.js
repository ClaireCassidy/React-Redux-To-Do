import React from "react";
import "./ListItem.css";
import { useDispatch } from "react-redux";
import { toggleImportant, deleteItem, toggleComplete } from "./Actions";

// action : mark completed

export default function ListItem({ todoItem }) {
  const {
    dateAdded,
    id,
    completed,
    text,
    important,
    expires,
  } = todoItem;

  const dispatch = useDispatch();

  const handleToggleImportant = (e) => {
    dispatch(toggleImportant(id));
  };

  const handleDelete = (e) => {
      dispatch(deleteItem(id));
  }

  const handleToggleComplete = (e) => {
    dispatch(toggleComplete(id));
  }

  const handleEditExpiry = (e) => {
    console.log("triggered");
  }

  return (
    <div className={"ListItemContainer"+(completed ? " Completed" : "")}>
      <div className="DateContainer">
        <p className="DateAdded">{formatDate(dateAdded)}</p>
      </div>

      <div className="TodoTextContainer">
        <p className="TodoText">{`id: ${id}\ncompleted: ${completed}\n${text}`}</p>
      </div>

      <div className="BottomBar">
        {/* Show the expiry date here if it has one */}
        <div className="ExpiresContainer">
          {/* {expires && (
            <p className="ExpiresText">{"Expires " + formatDate(expires)}</p>
          )}
          {!expires} */}
          <p className="ExpiresText">{expires ? "Expires " + formatDate(expires) : "(No expiry set)"}</p>
          <span className="EditExpiryText" onClick={handleEditExpiry}>(edit)</span>
        </div>

        <div className="ButtonBar">
          <div className="ImportantIcon" onClick={handleToggleImportant}>
            {important && "★"}
            {!important && "☆"}
          </div>

          <div className="DeleteIcon" onClick={handleDelete}>✖</div>

          <div className="CompletedIcon" onClick={handleToggleComplete}>
            {!completed && "☐"}
            {completed && "☑"}
          </div>
        </div>
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
