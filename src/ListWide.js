import React, { useState, useEffect } from "react";
import "./ListWide.css";
import ListItem from "./ListItem";
import { useSelector, useDispatch } from "react-redux";
import { SORT_CRITERIA } from "./constants";
import {
  deleteExpiredTodos,
  deleteCompletedTodos,
  setAutoDeleteCompleted,
  setShowCompleted,
} from "./Actions";

export default function ListWide() {
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
    // console.log(`Sort By change: ${e.target.value}`);
    setSortCriterion(e.target.value);
  };

  const handleDeleteExpired = (e) => {
    console.log("Deleting expired todos");
    dispatch(deleteExpiredTodos());
  };

  const handleToggleShowCompletedTodos = (e) => {
    // console.log("Toggling show completed");
    // setShowCompletedTodos((showCompletedTodos) => !showCompletedTodos);

    dispatch(setShowCompleted(!showCompletedTodos));
  };

  const handleDeleteCompletedTodos = (e) => {
    // console.log("Deleting Completed Todos");
    dispatch(deleteCompletedTodos());
  };

  const toggleDeleteCompletedAutomatically = (e) => {
    // console.log("Toggling delete completed automatically");

    // if we're setting it to true, we need to delete those todos currently marked active
    if (!autoDeleteCompleted) {
      dispatch(deleteCompletedTodos());
    }

    //
    // setDeleteCompletedAutomatically(
    //   (deleteCompletedAutomatically) => !deleteCompletedAutomatically
    // );
    dispatch(setAutoDeleteCompleted(!autoDeleteCompleted));
  };

  return (
    <>
      {/* LIST */}
      <h3 className="Showing">{`Showing (${startIndex}-${endIndex}) of ${numItems} items`}</h3>

      <div className="ListContainer">
        <div className="ListLeft">
          <div className="ListItemsContainer">
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
              <p className="NoItemsTip">(Tip - You can quickly add demo items using the demo bar at the top of the page)</p>
            )}
          </div>
        </div>
        <div className="ListRight">
          <h3 className="OptionsHeader">Options</h3>

          <hr className="Divider" />

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
  // console.log(`Sort criterion: ${sortCriterion}`);
  // console.log(`Show completed? ${showCompleted}`);

  let sortedList = applySortCriterion([...list], sortCriterion); // don't modify original
  // remove completed items if showCompleted not checked
  if (!showCompleted) {
    sortedList = sortedList.filter((item) => {
      return !item.completed;
    });
  }

  const startIndex = itemsPerPage * pageIndex;

  const subset = sortedList.slice(startIndex, startIndex + itemsPerPage);
  // console.log(subset);
  return subset;
};

const applySortCriterion = (list, sortCriterion) => {
  // list items stored in order of addition
  //  means implicitly the list is sorted oldest - newest
  switch (sortCriterion) {
    case SORT_CRITERIA.NEW:
      return list.reverse();
    case SORT_CRITERIA.OLD:
      return list;
    case SORT_CRITERIA.IMPORTANT:
      list.sort((a, b) => {
        let aIsImportant = a.important;
        let bIsImportant = b.important;

        if (aIsImportant && bIsImportant) return 0;
        if (aIsImportant && !bIsImportant) return -1;
        return 1;
      });
      // console.log(JSON.stringify(list));
      return list;
    case SORT_CRITERIA.EXPIRY:
      // console.log("Not yet sweaty!!");

      list.sort((a, b) => {
        let aExpiry = a.expires;
        let bExpiry = b.expires;
        // console.log(`${aExpiry} | ${bExpiry}`);

        // if neither have an expiry...
        if (aExpiry == null && bExpiry == null) return 0; // ... order irrelevant

        // if one has an expiry ...
        if (aExpiry == null || bExpiry == null) return aExpiry ? -1 : 1; // ...that item comes first

        // otherwise both have an expiry
        let aExpiryUnixTime = Date.parse(aExpiry);
        let bExpiryUnixTime = Date.parse(bExpiry);

        // console.log(
        //   `A Expiry: ${aExpiry} (In unix time: ${aExpiryUnixTime}), B Expiry: ${bExpiry} (In unix time: ${bExpiryUnixTime})`
        // );
        // console.log(`A before B ? ${aExpiryUnixTime - bExpiryUnixTime <= 0}`);
        return aExpiryUnixTime - bExpiryUnixTime;
      });
      return list;
  }
};