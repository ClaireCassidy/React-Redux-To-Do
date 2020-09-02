import { actionTypes } from "../action-types";
import { INITIAL_STATE } from "../constants.js";

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
    default:
      return state;
  }
};
