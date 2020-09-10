import React, { useState } from "react";
import "./ListMobile.css";
import ListItem from "./ListItem";
import { useSelector, useDispatch } from "react-redux";
import { SORT_CRITERIA } from "./constants";
import {
  deleteExpiredTodos,
  deleteCompletedTodos,
  setAutoDeleteCompleted,
  setShowCompleted,
} from "./Actions";

export default function ListMobile() {
  const [optionsActive, setOptionsActive] = useState(false);

  const [sortCriterion, setSortCriterion] = useState(SORT_CRITERIA.NEW);
  const autoDeleteCompleted = useSelector((state) => {
    return state.autoDeleteCompleted;
  });
  const showCompletedTodos = useSelector((state) => {
    return state.showCompleted;
  });

  const dispatch = useDispatch();

  const visibleListItems = useSelector((state) => {
    return getVisibleListItems(
      state.todos,
      state.itemsPerPage,
      state.pageIndex,
      sortCriterion,
      showCompletedTodos
    );
  });

  const [startIndex, endIndex, numItems] = useSelector((state) => {
    let startIndex = state.pageIndex * state.itemsPerPage + 1;
    let endIndex = startIndex + state.itemsPerPage - 1;
    let numItems = state.todos.length;

    return [startIndex, endIndex, numItems];
  });

  const handleSortByChange = (e) => {
    setSortCriterion(e.target.value);
  };

  const handleDeleteExpired = (e) => {
    dispatch(deleteExpiredTodos());
  };

  const handleToggleShowCompletedTodos = (e) => {
    dispatch(setShowCompleted(!showCompletedTodos));
  };

  const handleDeleteCompletedTodos = (e) => {
    dispatch(deleteCompletedTodos());
  };

  const toggleDeleteCompletedAutomatically = (e) => {
    // if we're setting it to true, we need to delete those todos currently marked active
    if (!autoDeleteCompleted) {
      dispatch(deleteCompletedTodos());
    }

    dispatch(setAutoDeleteCompleted(!autoDeleteCompleted));
  };

  return (
    <>
      {/* THE OPTIONS */}
      <div
        className="OptionsToggle"
        onClick={() => {
          setOptionsActive((optionsActive) => !optionsActive);
        }}
      >
        <p className="OptionsToggleText">Options ...</p>
        <p className="OptionsToggleArrow">⇵</p>
      </div>

      {!optionsActive && <hr className="Divider" />}

      {optionsActive && (
        <>
          <div className="OptionsMobile">
            <div className="SortBySection OptionsItem">
              <label className="SortBySelectLabel" htmlFor="SortBySelect">
                Sort By:
              </label>
              <select
                className="SortBySelect"
                name="SortBySelect"
                id="SortBySelect"
                value={sortCriterion}
                onChange={handleSortByChange}
              >
                <option value="NEW">Date Added (Newest)</option>
                <option value="OLD">Date Added (Oldest)</option>
                <option value="EXPIRY">Expires Soon</option>
                <option value="IMPORTANT">Important First</option>
              </select>
            </div>

            <hr className="Divider" />

            <div className="ShowCompletedContainer OptionsItem">
              <div>
                <label htmlFor="show-completed">Show Completed To-Dos?</label>
                <input
                  name="show-completed"
                  type="checkbox"
                  checked={showCompletedTodos}
                  onChange={handleToggleShowCompletedTodos}
                />
              </div>
            </div>

            <hr className="Divider" />

            <div className="DeleteCompletedContainer OptionsItem">
              <button
                className="OptionsButton"
                name="delete-completed"
                onClick={handleDeleteCompletedTodos}
              >
                Delete Completed To-dos
              </button>
              <label className="CannotUndoLabel" htmlFor="delete-completed">
                (This cannot be undone)
              </label>
              <div className="AutoDeleteCompletedContainer">
                <label
                  className="AutoDeleteCompletedLabel"
                  htmlFor="auto-delete-completed"
                >
                  Do this automatically
                </label>
                <input
                  name="auto-delete-completed"
                  type="checkbox"
                  checked={autoDeleteCompleted}
                  onChange={toggleDeleteCompletedAutomatically}
                />
              </div>
            </div>

            <hr className="Divider" />

            <div className="DeleteExpiredContainer OptionsItem">
              <button className="OptionsButton" onClick={handleDeleteExpired}>
                Delete Expired To-dos
              </button>
              <label className="CannotUndoLabel">(This cannot be undone)</label>
            </div>
          </div>

          <hr className="Divider" />
        </>
      )}

      {/* THE LIST */}
      <h3 className="Showing">{`Showing (${startIndex}-${endIndex}) of ${numItems} items`}</h3>

      <div className="ListContainerMobile">
        <div className="ListItemsContainerMobile">
          {visibleListItems.length > 0 ? (
            visibleListItems.map((item) => {
              return (
                <ListItem
                  todoItem={item}
                  key={item.dateAdded + Math.random()}
                />
              );
            })
          ) : (
            <>
              <p className="NoItemsTip">
                (Tip - You can quickly add demo items using the demo bar at the
                top of the page)
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

const getVisibleListItems = (
  list,
  itemsPerPage,
  pageIndex,
  sortCriterion,
  showCompleted
) => {
  let sortedList = applySortCriterion([...list], sortCriterion); // don't modify original
  // remove completed items if showCompleted not checked
  if (!showCompleted) {
    sortedList = sortedList.filter((item) => {
      return !item.completed;
    });
  }

  const startIndex = itemsPerPage * pageIndex;

  const subset = sortedList.slice(startIndex, startIndex + itemsPerPage);
  return subset;
};

const applySortCriterion = (list, sortCriterion) => {
  // list items stored in order of addition
  //  means implicitly the list is sorted oldest - newest
  switch (sortCriterion) {
    case SORT_CRITERIA.OLD:
      list.sort((a, b) => {
        let aDateAdded = a.dateAdded;
        let bDateAdded = b.dateAdded;
        let aID = a.id;
        let bID = b.id;

        let aDateAddedUnixTime = Date.parse(aDateAdded);
        let bDateAddedUnixTime = Date.parse(bDateAdded);

        if (aDateAddedUnixTime === bDateAddedUnixTime) {
          // were submitted in the same minute, so check id as a fall back
          if (a.id > b.id) return 1;
          return -1;
        }
        if (aDateAddedUnixTime < bDateAddedUnixTime) return -1;
        return 1;
      });

      return list;
    case SORT_CRITERIA.NEW:
      list.sort((a, b) => {
        let aDateAdded = a.dateAdded;
        let bDateAdded = b.dateAdded;

        let aID = a.id;
        let bID = b.id;

        let aDateAddedUnixTime = Date.parse(aDateAdded);
        let bDateAddedUnixTime = Date.parse(bDateAdded);

        if (aDateAddedUnixTime === bDateAddedUnixTime) {
          // were submitted in the same minute, so check id as a fall back
          if (a.id > b.id) return -1;
          return 1;
        }
        if (aDateAddedUnixTime < bDateAddedUnixTime) return 1;
        return -1;
      });

      return list;
    case SORT_CRITERIA.IMPORTANT:
      list.sort((a, b) => {
        let aIsImportant = a.important;
        let bIsImportant = b.important;

        if (aIsImportant && bIsImportant) return 0;
        if (aIsImportant && !bIsImportant) return -1;
        return 1;
      });
      return list;
    case SORT_CRITERIA.EXPIRY:

      list.sort((a, b) => {
        let aExpiry = a.expires;
        let bExpiry = b.expires;

        // if neither have an expiry...
        if (aExpiry == null && bExpiry == null) return 0; // ... order irrelevant

        // if one has an expiry ...
        if (aExpiry == null || bExpiry == null) return aExpiry ? -1 : 1; // ...that item comes first

        // otherwise both have an expiry
        let aExpiryUnixTime = Date.parse(aExpiry);
        let bExpiryUnixTime = Date.parse(bExpiry);

        return aExpiryUnixTime - bExpiryUnixTime;
      });
      return list;
  }
};
