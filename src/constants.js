export const INITIAL_STATE = {
    // unique key for each todo item, incr each time a new item added
    todoId: 1,
    todos: [{
        dateAdded: "2020-09-01T18:44",
        id: 0,
        completed: false,
        text: "hello",
        important: false,
        expires: "2020-09-01T18:44"
    }]
}

//      {
//     dateAdded: Date.now(),
//     listIndex: state.list.length,
//     text: "get milk",
//     important: true/false,
//     expires: [Date & time]
// }