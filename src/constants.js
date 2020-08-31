export const INITIAL_STATE = {
    todos: [{
        dateAdded: null,
        listIndex: 0,
        text: "hello",
        important: false,
        expires: null
    }]
}

//      {
//     dateAdded: Date.now(),
//     listIndex: state.list.length,
//     text: "get milk",
//     important: true/false,
//     expires: [Date & time]
// }