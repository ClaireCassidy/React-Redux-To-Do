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
},
{
    dateAdded: "2020-09-01T18:44",
    id: 2,
    completed: false,
    text: "hello",
    important: true,
    expires: "2020-09-07T18:44"
},
{
    dateAdded: "2020-09-04T18:44",
    id: 3,
    completed: false,
    text: "hello",
    important: true,
    expires: "2020-09-14T18:44"
},
{
    dateAdded: "2020-09-05T18:44",
    id: 4,
    completed: false,
    text: "hello",
    important: false,
    expires: "2020-09-07T18:43"
},
{
    dateAdded: "2020-09-09T18:44",
    id: 5,
    completed: false,
    text: "hello",
    important: true,
    expires: null
},
{
    dateAdded: "2020-09-09T18:45",
    id: 6,
    completed: false,
    text: "hello",
    important: false,
    expires: null
},
{
    dateAdded: "2020-09-09T18:45",
    id: 7,
    completed: false,
    text: "hello",
    important: false,
    expires: "2020-09-04T18:43"
}
];
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
    todoId: testItems.length,
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
    todos: testItems,
    autoDeleteCompleted: false,
    showCompleted: true
}



const demoItems = [
    {
        dateAdded: "2020-07-10T18:44",
        id: 0,
        completed: false,
        text: "This is an expired item",
        important: false,
        expires: "2020-07-12T13:44"
    }
]
