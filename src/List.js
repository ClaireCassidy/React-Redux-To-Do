import React, { useState } from "react";
import "./List.css";
import ListItem from "./ListItem";
import { useSelector } from "react-redux";

// action : change page (pagination)

export default function List() {

  const todoItems = useSelector((state) => {
    return state.todos;
  });

  const itemsPerPage = useSelector((state) => {
    return state.itemsPerPage;
  });

  const pageIndex = useSelector((state) => {
    return state.pageIndex;
  })

  const [visibleListItems, setVisibleListItems] = useState(getVisibleListItems(todoItems, itemsPerPage, pageIndex))

  return (
    <>
      {/* LIST */}
      <div className="ListContainer">
        {/* {todoItems.map((item) => {
                return (<p key={Date.now()+Math.random()} className="TodoItem">{JSON.stringify(item)}</p>);
            })} */}
            <p>{`Items per page: ${itemsPerPage}`}</p>
            <p>{`Page Index: ${pageIndex}`}</p>
            <p>{`Visible List Items: ${JSON.stringify(visibleListItems)}`}</p>
        {/* {todoItems.map((item) => {
          //console.log(JSON.stringify(item));
          return <ListItem todoItem={item} key={item.dateAdded + item.id} />;
        })} */}
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