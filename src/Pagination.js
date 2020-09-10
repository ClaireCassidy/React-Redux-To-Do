import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Pagination.css";
import { ITEMS_PER_PAGE_INCREMENTS, PAGE_CHANGE_DIRECTIONS } from "./constants";
import { updateItemsPerPage, changePageNumber } from "./Actions";

export default function Pagination() {
  const dispatch = useDispatch();

  const pageNumber = useSelector((state) => {
    return state.pageIndex;
  });

  const handleItemsPerPageChange = (noItems) => {
    dispatch(updateItemsPerPage(noItems));
  };

  const handlePageNumberInput = (e) => {
    const keyCode = e.keyCode || e.which;
    // keyCode === 13 => triggered by ENTER key
    // keyCode == null => triggered by lose focus
    if (keyCode === 13 || keyCode == null) {
      if (e.target.value !== "") {
        dispatch(changePageNumber(parseInt(e.target.value) - 1));
      } else {
        e.target.placeholder = parseInt(pageNumber) + 1;
      }
      e.target.value = "";
      e.target.blur();
    }
  };

  const handlePageArrowClick = (direction) => {
    dispatch(changePageNumber(direction));
  };

  const [prevDisabled, nextDisabled] = useSelector((state) => {
    let isPrevDisabled = state.pageIndex === 0;

    let todosCopy = [...state.todos];
    let numTodos = state.todos.length;

    if (!state.showCompleted) {
      let nonCompletedTodos = todosCopy.filter((item) => {return !item.completed});
      numTodos = nonCompletedTodos.length;
    }
    let isNextDisabled =
      numTodos - (state.pageIndex + 1) * state.itemsPerPage <= 0;
    return [isPrevDisabled, isNextDisabled];
  });

  return (
    <>
      <div className="PaginationContainerOuter">
        <div className="PaginationContainerInner">
          <div className="ItemsPerPageContainer">
            <p className="ItemsPerPageLabel">Items Per Page:</p>
            <button
              className="ItemsPerPageButton"
              onClick={() => {
                handleItemsPerPageChange(ITEMS_PER_PAGE_INCREMENTS[0]);
              }}
            >
              {ITEMS_PER_PAGE_INCREMENTS[0]}
            </button>
            <button
              className="ItemsPerPageButton"
              onClick={() =>
                handleItemsPerPageChange(ITEMS_PER_PAGE_INCREMENTS[1])
              }
            >
              {ITEMS_PER_PAGE_INCREMENTS[1]}
            </button>
            <button
              className="ItemsPerPageButton"
              onClick={() =>
                handleItemsPerPageChange(ITEMS_PER_PAGE_INCREMENTS[2])
              }
            >
              {ITEMS_PER_PAGE_INCREMENTS[2]}
            </button>
          </div>
          <div className="PageNumberContainer">
            <button
              className="PageNumberButton PagePrev"
              onClick={() => {
                handlePageArrowClick(PAGE_CHANGE_DIRECTIONS.PREV);
              }}
              disabled={prevDisabled}
            >
              ⇐
            </button>
            <input
              className="PageNumberInput"
              name="PageNumberInput"
              pattern="[0-9]"
              type="number"
              placeholder={parseInt(pageNumber) + 1}
              onFocus={(e) => {
                e.target.placeholder = "";
              }}
              onKeyPress={handlePageNumberInput}
              onBlur={handlePageNumberInput}
            />
            <button
              className="PageNumberButton PageNext"
              onClick={() => {
                handlePageArrowClick(PAGE_CHANGE_DIRECTIONS.NEXT);
              }}
              disabled={nextDisabled}
            >
              ⇒
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
