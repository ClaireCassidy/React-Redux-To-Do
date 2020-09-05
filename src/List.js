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
  })
  // *===============================================

  const visibleListItems = useSelector((state) => {
    return getVisibleListItems(state.todos, state.itemsPerPage, state.pageIndex);
  })

  const [startIndex, endIndex, numItems] = useSelector((state) => {
    let startIndex = (state.pageIndex * state.itemsPerPage + 1);
    let endIndex = startIndex + state.itemsPerPage - 1;
    let numItems = state.todos.length;

    return [startIndex, endIndex, numItems];
  })

  return (
    <>
      {/* LIST */}
      <h3 className="Showing">{`Showing (${startIndex}-${endIndex}) of ${numItems} items`}</h3>
      <div className="ListContainer">
        {visibleListItems.map((item) => {
          return <ListItem todoItem={item} key={item.dateAdded + item.id} />
        })}
      </div>
    </>
  );
}

const getVisibleListItems = (list, itemsPerPage, pageIndex) => {
  const startIndex = itemsPerPage * pageIndex;

  const subset = list.slice(startIndex, startIndex+itemsPerPage);
  console.log(subset);
  return subset;
}