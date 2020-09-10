
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

export const DEMO_ITEMS = [
  {
    dateAdded: "2020-09-08T10:42",
    id: 0,
    completed: false,
    text: `  The remaining items will be filler items to demonstrate the pagination feature. 
    \nFor convenience, the Demo Bar has options for quickly adding items to test the individual functionalities.
        `,
    important: false,
    expires: null,
  },
  {
    dateAdded: "2020-09-08T10:42",
    id: 1,
    completed: false,
    text:
      'I am an expired item. I will be deleted automatically when you click "Delete Expired Todos" in the Options menu',
    important: false,
    expires: "2015-07-12T13:44",
  },
  {
    dateAdded: "2020-09-08T10:42",
    id: 2,
    completed: true,
    text: `I am a completed todo. You can toggle my visibility by clicking "Show Completed To-Dos" in the options menu. 
    \nYou can also opt to automatically delete any todos marked complete.`,
    important: false,
    expires: (parseInt(new Date().getFullYear()) +1)+"-03-22T17:14",
  },
  {
    dateAdded: "2020-09-08T10:42",
    id: 3,
    completed: false,
    text: `I am an important to-do. You can opt to see me first by selecting "Important First" in the Sort-By menu`,
    important: true,
    expires: (parseInt(new Date().getFullYear()) +1)+"-07-12T13:44",
  },
  {
    dateAdded: "2020-09-08T10:42",
    id: 4,
    completed: false,
    text: ` ... Similarly you can edit or remove the expiry date for any todo by hovering over the expiry date section and clicking "edit"`,
    important: false,
    expires: null,
  },
  {
    dateAdded: "2020-09-08T10:42",
    id: 5,
    completed: false,
    text: `You can edit text for a submitted todo by hovering over it and clicking "edit" ...`,
    important: false,
    expires: null,
  },
  {
    dateAdded: "2020-09-08T10:42",
    id: 6,
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
    id: 7,
    completed: false,
    text: `Thanks for checking out my todo app!
        \nNew todos can be added by filling out the form above ↑
        \nThe todos are paginated. You can change the number of items per page by using the buttons at the bottom of the list. You can jump to a specific page by editing the page number in the bottom right.
        \nBy default, todos are ordered newest-to-oldest with respect to the time they were added. You can change the sort order in the options menu.
    `,
    important: false,
    expires: null,
  },
  {
    dateAdded: "2020-08-01T21:47",
    id: 8,
    completed: false,
    text: `Get Milk`,
    important: false,
    expires: null,
  },
  {
    dateAdded: "2020-07-02T13:55",
    id: 9,
    completed: false,
    text: `Call John`,
    important: true,
    expires: null,
  },
  {
    dateAdded: "2020-08-11T12:34",
    id: 9,
    completed: false,
    text: `Go Running`,
    important: false,
    expires: null,
  },
  {
    dateAdded: "2020-02-17T15:31",
    id: 10,
    completed: false,
    text: `Get Newspaper`,
    important: false,
    expires: null,
  },
  {
    dateAdded: "2020-07-06T21:27",
    id: 11,
    completed: false,
    text: `Do Dishes`,
    important: false,
    expires: null,
  },
  {
    dateAdded: "2020-01-15T08:00",
    id: 12,
    completed: false,
    text: `Fold Laundry`,
    important: false,
    expires: null,
  },
  {
    dateAdded: "2020-04-30T03:21",
    id: 13,
    completed: false,
    text: `Feed Cat`,
    important: false,
    expires: null,
  },  {
    dateAdded: "2020-06-14T02:31",
    id: 14,
    completed: false,
    text: `Make doctors appointment`,
    important: false,
    expires: null,
  },  {
    dateAdded: "2020-05-07T17:04",
    id: 15,
    completed: false,
    text: `Replace ink in printer`,
    important: true,
    expires: null,
  },  {
    dateAdded: "2020-03-26T19:39",
    id: 16,
    completed: false,
    text: `Change lightbulb`,
    important: false,
    expires: "2020-01-01T13:21",
  },  {
    dateAdded: "2020-08-01T13:21",
    id: 17,
    completed: false,
    text: `Walk dog`,
    important: false,
    expires: null,
  },  {
    dateAdded: "2020-07-28T01:11",
    id: 18,
    completed: false,
    text: `Make packed lunch`,
    important: false,
    expires: null,
  },  {
    dateAdded: "2020-02-16T06:09",
    id: 19,
    completed: false,
    text: `Mop kitchen`,
    important: true,
    expires: null,
  },  {
    dateAdded: "2020-09-01T08:42",
    id: 20,
    completed: false,
    text: `Take out bins`,
    important: false,
    expires: "2020-02-07T17:11",
  },  {
    dateAdded: "2020-02-18T11:47",
    id: 21,
    completed: false,
    text: `Book restaurant`,
    important: false,
    expires: null,
  },
  {
    dateAdded: "2020-02-21T13:07",
    id: 22,
    completed: false,
    text: `Buy birthday gift`,
    important: false,
    expires: null,
  },  {
    dateAdded: "2020-05-01T16:42",
    id: 23,
    completed: false,
    text: `Pay electric bill`,
    important: false,
    expires: null,
  },
];

export const INITIAL_STATE = {
  // unique key for each todo item, incr each time a new item added
  todoId: 0,
  itemsPerPage: ITEMS_PER_PAGE_INCREMENTS[0],
  pageIndex: 0,
  todos: [],
  autoDeleteCompleted: false,
  showCompleted: true,
};


