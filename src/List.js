import React, { useState } from "react";
import "./List.css";
import ListItem from "./ListItem";
import { useSelector } from "react-redux";
import { SORT_CRITERIA } from "./constants";

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

  const [sortCriterion, setSortCriterion] = useState(SORT_CRITERIA.NEW);

  const visibleListItems = useSelector((state) => {
    return getVisibleListItems(
      state.todos,
      state.itemsPerPage,
      state.pageIndex,
      sortCriterion
    );
  });

  const [startIndex, endIndex, numItems] = useSelector((state) => {
    let startIndex = state.pageIndex * state.itemsPerPage + 1;
    let endIndex = startIndex + state.itemsPerPage - 1;
    let numItems = state.todos.length;

    return [startIndex, endIndex, numItems];
  });

  const handleSortByChange = (e) => {
    console.log(`Sort By change: ${e.target.value}`);
    setSortCriterion(e.target.value);
  };

  return (
    <>
      {/* LIST */}
      <h3 className="Showing">{`Showing (${startIndex}-${endIndex}) of ${numItems} items`}</h3>

      <div className="ListContainer">
        <div className="ListLeft">
          <div className="ListItemsContainer">
            {visibleListItems.map((item) => {
              return (
                <ListItem
                  todoItem={item}
                  key={item.dateAdded + Math.random()}
                />
              );
            })}
          </div>
        </div>
        <div className="ListRight">
          <h3 className="OptionsHeader">Options</h3>

          <div className="SortBySection OptionsItem">
            <label htmlFor="SortBySelect">Sort By:</label>
            <select
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

          <div className="DeleteExpiredContainer OptionsItem">
            <button>Delete Expired To-dos</button>
          </div>

          <div className="ShowCompletedContainer OptionsItem">
            <div>
              <label htmlFor="show-completed">Show Completed To-Dos?</label>
              <input name="show-completed" type="checkbox" />
            </div>
          </div>

          <div className="DeleteCompletedContainer OptionsItem">
            <button name="delete-completed">Delete Completed To-dos</button>
            <label htmlFor="delete-completed">(This cannot be undone)</label>
            <div>
              <label htmlFor="auto-delete-completed">
                Do this automatically
              </label>
              <input name="auto-delete-completed" type="checkbox" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const getVisibleListItems = (list, itemsPerPage, pageIndex, sortCriterion) => {
  console.log(`Sort criterion: ${sortCriterion}`);

  const sortedList = applySortCriterion([...list], sortCriterion); // don't modify original

  const startIndex = itemsPerPage * pageIndex;

  const subset = sortedList.slice(startIndex, startIndex + itemsPerPage);
  // console.log(subset);
  return subset;
};

const applySortCriterion = (list, sortCriterion) => {
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
      console.log(JSON.stringify(list));
      return list;
    case SORT_CRITERIA.EXPIRY:
      // console.log("Not yet sweaty!!");

      list.sort( (a, b) => {

        let aExpiry = a.expires;
        let bExpiry = b.expires;
        console.log(`${aExpiry} | ${bExpiry}`);

        // if neither have an expiry...
        if (aExpiry == null && bExpiry == null) return 0; // ... order irrelevant

        // if one has an expiry ...
        if (aExpiry == null || bExpiry == null) return (aExpiry ? -1 : 1); // ...that item comes first

        // otherwise both have an expiry
        let aExpiryUnixTime = Date.parse(aExpiry);
        let bExpiryUnixTime = Date.parse(bExpiry);

        console.log(`A Expiry: ${aExpiry} (In unix time: ${aExpiryUnixTime}), B Expiry: ${bExpiry} (In unix time: ${bExpiryUnixTime})`);
        console.log(`A before B ? ${aExpiryUnixTime - bExpiryUnixTime <= 0}`);
        return (aExpiryUnixTime - bExpiryUnixTime);
      })
      return list;
  }
};
