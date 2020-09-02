import { actionTypes } from "../action-types";
import { INITIAL_STATE } from "../constants.js";


//@TODO: Refactor reducer methods to use getIndexById
// @TODO: Combine reducers?

export const rootReducer = (state = INITIAL_STATE, action) => {
  //console.log("Initial state: " + JSON.stringify(INITIAL_STATE));
  //console.log("Action types: " + JSON.stringify(actionTypes));

  switch (action.type) {
    case actionTypes.ADD_ITEM: {
      return Object.assign({}, state, {
        todoId: state.todoId + 1,
        todos: [...state.todos, action.payload],
      });
    }
    case actionTypes.TOGGLE_IMPORTANT: {
      let todosCopy = [...state.todos];
      //console.log(todosCopy);
      let id = action.payload;

      let index = -1;
      for (let i = 0; i < todosCopy.length; i++) {
        if (todosCopy[i].id === id) {
          index = i;
          break;
        }
      }

      let todo = Object.assign({}, todosCopy[index]);
      todo.important = !todo.important;

      // replace it
      todosCopy.splice(index, 1, todo);

      return Object.assign({}, state, {
        todos: todosCopy,
      });
    }
    case actionTypes.DELETE_ITEM: {
      console.log(`Deleting item w id ${action.payload}`);
      let todosCopy = [...state.todos];
      let id = action.payload;

      let index = -1;
      for (let i = 0; i < todosCopy.length; i++) {
        if (todosCopy[i].id === id) {
          index = i;
          break;
        }
      }

      console.log(JSON.stringify(todosCopy));
      console.log(`Found todo item w id ${id} @ index ${index}`);
      todosCopy.splice(index, 1);

      return Object.assign({}, state, {
        todos: todosCopy,
      });
    }
    case (actionTypes.TOGGLE_COMPLETE): {
      const id = action.payload;
      let todosCopy = [...state.todos];

      console.log("Toggling completed status of item w id "+id);

      let index = -1;
      for (let i = 0; i<todosCopy.length; i++) {
        if (todosCopy[i].id === id) {
          index = i;
          break;
        }
      }

      console.log("Found target @ index "+index);

      let targetTodo = Object.assign({}, todosCopy[index]);
      targetTodo.completed = !targetTodo.completed;

      todosCopy.splice(index, 1, targetTodo);

      return Object.assign({}, state, {
        todos: todosCopy,
      });
    }
    case (actionTypes.REMOVE_EXPIRY): {
      const id = action.payload;
      const todosCopy = [...state.todos];

      const index = getTodoIndexById(todosCopy, id);
      const itemCopy = Object.assign({}, todosCopy[index]);
      console.log(JSON.stringify(itemCopy));

      itemCopy.expires = null;
      todosCopy.splice(index, 1, itemCopy);

      return Object.assign({}, state, {
        todos: todosCopy
      });

    }
    case (actionTypes.UPDATE_EXPIRY): {

      console.log(JSON.stringify(action));
      const {id, selectedExpiryDate} = action.payload;

      const todosCopy = [...state.todos];
      // console.log(`id: ${id}, newExpiry: ${selectedExpiryDate}`);


      const index = getTodoIndexById(todosCopy, id);
      const itemCopy = Object.assign({}, todosCopy[index]);
      // console.log(JSON.stringify(itemCopy));

      itemCopy.expires = selectedExpiryDate;
      // console.log(JSON.stringify(itemCopy));
      todosCopy.splice(index, 1, itemCopy);

      return Object.assign({}, state, {
        todos: todosCopy
      });
    }
    case (actionTypes.SUBMIT_TEXT_EDIT): {
      const {id, newTodoText} = action.payload;
      const todosCopy = [...state.todos];
      const index = getTodoIndexById(id);

      const itemCopy = Object.assign({}, todosCopy[id]);
      itemCopy.text = newTodoText;

      todosCopy.splice(index, 1, itemCopy);

      return Object.assign({}, state, {
        todos: todosCopy
      });
    }
    default:
      return state;
  }
};

const getTodoIndexById = (list, id) => {

  for (let i=0; i<list.length; i++) {
    if (list[i].id === id) {
      return i;
    }
  }

  return -1;
}
