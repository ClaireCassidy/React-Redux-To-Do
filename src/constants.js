// *==================================
// @TODO: remove
const testItem = {
  dateAdded: "2020-09-01T18:44",
  id: 0,
  completed: false,
  text: "hello",
  important: false,
  expires: "2020-09-01T18:44",
};
const testItems = [
  {
    dateAdded: "2020-09-01T18:44",
    id: 0,
    completed: false,
    text: "hello",
    important: false,
    expires: "2020-09-10T18:44",
  },
  {
    dateAdded: "2020-09-01T18:44",
    id: 1,
    completed: false,
    text: "hello",
    important: false,
    expires: "2020-09-11T18:44",
  },
  {
    dateAdded: "2020-09-01T18:44",
    id: 2,
    completed: false,
    text: "hello",
    important: true,
    expires: "2020-09-07T18:44",
  },
  {
    dateAdded: "2020-09-04T18:44",
    id: 3,
    completed: false,
    text: "hello",
    important: true,
    expires: "2020-09-14T18:44",
  },
  {
    dateAdded: "2020-09-05T18:44",
    id: 4,
    completed: false,
    text: "hello",
    important: false,
    expires: "2020-09-07T18:43",
  },
  {
    dateAdded: "2020-09-09T18:44",
    id: 5,
    completed: false,
    text: "hello",
    important: true,
    expires: null,
  },
  {
    dateAdded: "2020-09-09T18:45",
    id: 6,
    completed: false,
    text: "hello",
    important: false,
    expires: null,
  },
  {
    dateAdded: "2020-09-09T18:45",
    id: 7,
    completed: false,
    text: "hello",
    important: false,
    expires: "2020-09-04T18:43",
  },
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

export const ITEMS_PER_PAGE_INCREMENTS = [5, 10, 20];
export const PAGE_CHANGE_DIRECTIONS = {
  NEXT: "NEXT",
  PREV: "PREV",
};
export const SORT_CRITERIA = {
  OLD: "OLD",
  NEW: "NEW",
  EXPIRY: "EXPIRY",
  IMPORTANT: "IMPORTANT",
};

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
  todos: [],
  autoDeleteCompleted: false,
  showCompleted: true,
};

export const DEMO_ITEMS = [
  {
    dateAdded: "2020-09-08T10:42",
    id: 7,
    completed: false,
    text: `  The remaining items will be filler items to demonstrate the pagination feature. 
    \nFor convenience, the Demo Bar has options for quickly adding items to test the individual functionalities.
        `,
    important: false,
    expires: null,
  },
  {
    dateAdded: "2020-07-10T18:44",
    id: 0,
    completed: false,
    text:
      'I am an expired item. I will be deleted automatically when you click "Delete Expired Todos" in the Options menu',
    important: false,
    expires: "2015-07-12T13:44",
  },
  {
    dateAdded: "2020-09-04T14:22",
    id: 1,
    completed: true,
    text: `I am a completed todo. You can toggle my visibility by clicking "Show Completed To-Dos" in the options menu. 
    \nYou can also opt to automatically delete any todos marked complete.`,
    important: false,
    expires: "2020-07-12T13:44",
  },
  {
    dateAdded: "2020-09-06T15:04",
    id: 2,
    completed: false,
    text: `I am an important to-do. You can opt to see me first by selecting "Important First" in the Sort-By menu`,
    important: true,
    expires: "2020-07-12T13:44",
  },
  {
    dateAdded: "2020-09-08T10:42",
    id: 3,
    completed: false,
    text: ` ... Similarly you can edit the expiry date for any todo by hovering over the expiry date section and clicking "edit"`,
    important: false,
    expires: null,
  },
  {
    dateAdded: "2020-09-08T10:42",
    id: 4,
    completed: false,
    text: `You can edit text for a submitted todo by hovering over it and clicking "edit" ...`,
    important: false,
    expires: "2020-10-01T00:00",
  },
  {
    dateAdded: "2020-09-08T10:42",
    id: 5,
    completed: false,
    text: `Along the bottom of each todo are buttons which perform the following actions:
        \n☆: Toggle important
        \n✖: Delete this todo
        \n☐: Toggle complete
    `,
    important: false,
    expires: null,
  },
  {
    dateAdded: "2020-09-08T10:42",
    id: 6,
    completed: false,
    text: `Thanks for checking out my todo app!
        \nNew todos can be added by filling out the form above ↑
        \nThe todos are paginated. You can change the number of items per page by using the buttons at the bottom of the list. You can jump to a specific page by editing the page number in the bottom right.
        \nBy default, todos are ordered newest-to-oldest with respect to the time they were added. You can change the sort order in the options menu.
    `,
    important: false,
    expires: null,
  },
];

//@TODO: Change sorts to actually look at date vs list order
//@TODO: Change Demo Items to dynamically choose dates that aren't expired unless required to be expired (cos someone might look in 2 years and go to try  demo delete expired todos and they all delete)
