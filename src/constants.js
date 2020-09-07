// *==================================
// @TODO: remove
const testItem = {
    dateAdded: "2020-09-01T18:44",
    id: 0,
    completed: false,
    text: "hello",
    important: false,
    expires: "2020-09-01T18:44"
}
const testItems = 
[{
    dateAdded: "2020-09-01T18:44",
    id: 0,
    completed: false,
    text: "hello",
    important: false,
    expires: "2020-09-10T18:44"
},
{
    dateAdded: "2020-09-01T18:44",
    id: 1,
    completed: false,
    text: "hello",
    important: false,
    expires: "2020-09-11T18:44"
}];
// for (let i=0; i<25; i++) {
//     testItems[i] = Object.assign({}, testItem, {
//         id: i
//     });

// }
//console.log(testItems);
//      {
//     dateAdded: Date.now(),
//     listIndex: state.list.length,
//     text: "get milk",
//     important: true/false,
//     expires: [Date & time]
// }

// *===================================

export const ITEMS_PER_PAGE_INCREMENTS = [5, 10 , 20];
export const PAGE_CHANGE_DIRECTIONS = {
    NEXT: "NEXT",
    PREV: "PREV"
}
export const SORT_CRITERIA = {
    OLD: "OLD",
    NEW: "NEW",
    EXPIRY: "EXPIRY",
    IMPORTANT: "IMPORTANT"
}

// @TODO: set todoId back to !! 1 !! when test todos removed
export const INITIAL_STATE = {
    // unique key for each todo item, incr each time a new item added
    todoId: 2,
    itemsPerPage: ITEMS_PER_PAGE_INCREMENTS[0],
    pageIndex: 0,
    // todos: [{
    //     dateAdded: "2020-09-01T18:44",
    //     id: 0,
    //     completed: false,
    //     text: "hello",
    //     important: false,
    //     expires: "2020-09-01T18:44"
    // }]
    todos: testItems
}
