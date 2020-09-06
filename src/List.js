import React, { useState } from "react";
import "./List.css";
import ListItem from "./ListItem";
import { useSelector } from "react-redux";

// action : change page (pagination)

export default function List() {
  // @TODO: remove *=================================
  const todoItems = useSelector((state) => {
    return state.todos;
  });

  const itemsPerPage = useSelector((state) => {
    return state.itemsPerPage;
  });

  const pageIndex = useSelector((state) => {
    return state.pageIndex;
  });
  // *===============================================

  const visibleListItems = useSelector((state) => {
    return getVisibleListItems(
      state.todos,
      state.itemsPerPage,
      state.pageIndex
    );
  });

  const [startIndex, endIndex, numItems] = useSelector((state) => {
    let startIndex = state.pageIndex * state.itemsPerPage + 1;
    let endIndex = startIndex + state.itemsPerPage - 1;
    let numItems = state.todos.length;

    return [startIndex, endIndex, numItems];
  });

  return (
    <>
      {/* LIST */}
      <h3 className="Showing">{`Showing (${startIndex}-${endIndex}) of ${numItems} items`}</h3>

      <div className="ListContainer">
        <div className="ListLeft">
          <div className="ListItemsContainer">
            {visibleListItems.map((item) => {
              return (
                <ListItem todoItem={item} key={item.dateAdded + Math.random()} />
              );
            })}
          </div>
        </div>
        <div className="ListRight">
          <h3 className="OptionsHeader">Options</h3>
          <label htmlFor="SortBySelect">Sort By:</label>
          <select name="SortBySelect" id="SortBySelect">
            <option value="newest">Date Added (Newest)</option>
            <option value="oldest">Date Added (Oldest)</option>
            <option value="expiry">Expires Soon</option>
            <option value="important">Important First</option>
          </select>
          <button>Delete Expired To-dos</button>
          <label htmlFor="show-completed">Show Completed To-Dos?</label>
          <input name="show-completed" type="checkbox"/>
          <button name="delete-completed">Delete Completed To-dos</button>
          <label htmlFor="delete-completed">(This cannot be undone)</label>
          <label htmlFor="auto-delete-completed">Do this automatically</label>
          <input name="auto-delete-completed" type="checkbox"/>

        </div>
      </div>
    </>
  );
}

const getVisibleListItems = (list, itemsPerPage, pageIndex) => {
  const startIndex = itemsPerPage * pageIndex;

  const subset = list.slice(startIndex, startIndex + itemsPerPage);
  // console.log(subset);
  return subset;
};
