import React from "react";
import { useDispatch } from 'react-redux';
import "./Pagination.css";
import { ITEMS_PER_PAGE_INCREMENTS } from "./constants";
import { updateItemsPerPage } from "./Actions";

export default function Pagination() {

  const dispatch = useDispatch();

  const handleItemsPerPageChange = (noItems) => {
    // console.log(`NoItems: ${noItems}`);
    dispatch(updateItemsPerPage(noItems));
  };

  return (
    <>
      <div className="PaginationContainer">
        <div className="ItemsPerPageContainer">
          <p className="ItemsPerPageLabel">Items Per Page:</p>
          <button
            className="ItemsPerPageButton"
            onClick={() => {handleItemsPerPageChange(ITEMS_PER_PAGE_INCREMENTS[0])}}
          >
            {ITEMS_PER_PAGE_INCREMENTS[0]}
          </button>
          <button className="ItemsPerPageButton"
            onClick={() => handleItemsPerPageChange(ITEMS_PER_PAGE_INCREMENTS[1])}
          >
            {ITEMS_PER_PAGE_INCREMENTS[1]}
          </button>
          <button className="ItemsPerPageButton"
            onClick={() => handleItemsPerPageChange(ITEMS_PER_PAGE_INCREMENTS[2])}
          >
            {ITEMS_PER_PAGE_INCREMENTS[2]}
          </button>
        </div>
        {/* <div className="VerticalDivider">❘</div> */}
        <div className="PageNumberContainer">
          <button className="PageNumberButton PagePrev">⇐</button>
          <input className="PageNumberInput" type="text" value="1" />
          <button className="PageNumberButton PageNext">⇒</button>
        </div>
      </div>
    </>
  );
}
