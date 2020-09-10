import { actionTypes } from "../action-types";
import {
  INITIAL_STATE,
  PAGE_CHANGE_DIRECTIONS,
  DEMO_ITEMS,
} from "../constants.js";

export const rootReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    
    case actionTypes.ADD_ITEM: {
      return Object.assign({}, state, {
        todoId: state.todoId + 1,
        todos: [...state.todos, action.payload],
      });
    };

    case actionTypes.TOGGLE_IMPORTANT: {
      let todosCopy = [...state.todos];
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
    };

    case actionTypes.DELETE_ITEM: {
      let todosCopy = [...state.todos];
      let id = action.payload;

      let index = -1;
      for (let i = 0; i < todosCopy.length; i++) {
        if (todosCopy[i].id === id) {
          index = i;
          break;
        }
      }

      todosCopy.splice(index, 1);

      // adjust page index if necessary
      let newPageIndex = validatePageNumber(
        state.pageIndex,
        state.itemsPerPage,
        todosCopy.length
      );

      return Object.assign({}, state, {
        todos: todosCopy,
        pageIndex: newPageIndex,
      });
    };

    case actionTypes.TOGGLE_COMPLETE: {
      const id = action.payload;
      let todosCopy = [...state.todos];

      let index = -1;
      for (let i = 0; i < todosCopy.length; i++) {
        if (todosCopy[i].id === id) {
          index = i;
          break;
        }
      }

      let targetTodo = Object.assign({}, todosCopy[index]);
      targetTodo.completed = !targetTodo.completed;

      todosCopy.splice(index, 1, targetTodo);

      return Object.assign({}, state, {
        todos: todosCopy,
      });
    };

    case actionTypes.REMOVE_EXPIRY: {
      const id = action.payload;
      const todosCopy = [...state.todos];

      const index = getTodoIndexById(todosCopy, id);
      const itemCopy = Object.assign({}, todosCopy[index]);

      itemCopy.expires = null;
      todosCopy.splice(index, 1, itemCopy);

      return Object.assign({}, state, {
        todos: todosCopy,
      });
    };

    case actionTypes.UPDATE_EXPIRY: {
      const { id, selectedExpiryDate } = action.payload;

      const todosCopy = [...state.todos];

      const index = getTodoIndexById(todosCopy, id);
      const itemCopy = Object.assign({}, todosCopy[index]);

      itemCopy.expires = selectedExpiryDate;
      todosCopy.splice(index, 1, itemCopy);

      return Object.assign({}, state, {
        todos: todosCopy,
      });
    };

    case actionTypes.SUBMIT_TEXT_EDIT: {
      const { id, newTodoText } = action.payload;

      const todosCopy = [...state.todos];
      const index = getTodoIndexById(todosCopy, id);

      const itemCopy = Object.assign({}, todosCopy[index]);
      itemCopy.text = newTodoText;

      todosCopy.splice(index, 1, itemCopy);

      return Object.assign({}, state, {
        todos: todosCopy,
      });
    };

    case actionTypes.UPDATE_ITEMS_PER_PAGE: {
      return Object.assign({}, state, {
        itemsPerPage: action.payload,
        pageIndex: 0,
      });
    };

    case actionTypes.UPDATE_PAGE_NUMBER: {

      let updatedValue = 0;

      switch (action.payload) {
        case PAGE_CHANGE_DIRECTIONS.NEXT:
          updatedValue = state.pageIndex + 1;
          break;
        case PAGE_CHANGE_DIRECTIONS.PREV:
          updatedValue = state.pageIndex - 1;
          break;
        default:
          let numTodos;
          if (!state.showCompleted) {
            const todosCopy = [...state.todos];
            const nonCompletedTodos = todosCopy.filter((item) => {
              return !item.completed;
            });
            numTodos = nonCompletedTodos.length;
          } else {
            numTodos = state.todos.length;
          }

          updatedValue = validatePageNumber(
            action.payload,
            state.itemsPerPage,
            numTodos
          );
          break;
      }

      return Object.assign({}, state, {
        pageIndex: updatedValue,
      });
    };

    case actionTypes.DELETE_ALL_EXPIRED: {
      const todosCopy = [...state.todos];

      const curTimeUnix = Date.now();

      const nonExpiredItems = todosCopy.filter((item, index) => {
        const itemsExpiry = item.expires;
        if (itemsExpiry) {
          const itemsExpiryUnix = Date.parse(itemsExpiry);
          if (curTimeUnix - itemsExpiryUnix <= 0) return true;
        } else {
          return true;
        }
        return false;
      });

      // adjust page index if necessary
      let newPageIndex = validatePageNumber(
        state.pageIndex,
        state.itemsPerPage,
        nonExpiredItems.length
      );

      return Object.assign({}, state, {
        todos: nonExpiredItems,
        pageIndex: newPageIndex,
      });
    };

    case actionTypes.DELETE_COMPLETED_TODOS: {
      let todosCopy = [...state.todos];

      let nonCompletedItems = todosCopy.filter((item) => {
        return !item.completed;
      });

      // adjust page index if necessary
      let newPageIndex = validatePageNumber(
        state.pageIndex,
        state.itemsPerPage,
        nonCompletedItems.length
      );

      return Object.assign({}, state, {
        todos: nonCompletedItems,
        pageIndex: newPageIndex,
      });
    };

    case actionTypes.SET_AUTO_DELETE_COMPLETED: {
      return Object.assign({}, state, {
        autoDeleteCompleted: action.payload,
      });
    };

    case actionTypes.SET_SHOW_COMPLETED: {
      let newPageIndex = state.pageIndex;

      // toggling visibility of todos may leave the user on an invalid page
      if (!action.payload) {
        // if were not showing completed todos ...
        const todosCopy = [...state.todos];
        const nonCompletedTodos = todosCopy.filter((item) => {
          return !item.completed;
        });

        // ... recalculate the max page number and adjust the current page number if necessary
        const newPageNumber = validatePageNumber(
          state.pageIndex,
          state.itemsPerPage,
          nonCompletedTodos.length
        );

        newPageIndex = newPageNumber;
      }

      return Object.assign({}, state, {
        showCompleted: action.payload,
        pageIndex: newPageIndex,
      });
    };

    //DEMO ACTIONS:
    case actionTypes.LOAD_DEMO_ITEMS: {
      return Object.assign({}, state, {
        todos: DEMO_ITEMS,
        todoId: DEMO_ITEMS.length,
      });
    };

    default:
      return state;

  };
};

const getTodoIndexById = (list, id) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      return i;
    }
  }

  return -1;
};

// check the page number is within bounds and if not return the closest valid page number
// passed a 0-indexed page number
const validatePageNumber = (candidatePageNum, itemsPerPage, numTodos) => {
  if (candidatePageNum < 0) {
    return 0;
  } else {
    let maxPageIndex = Math.max(0, Math.ceil(numTodos / itemsPerPage) - 1);
    if (candidatePageNum > maxPageIndex) return maxPageIndex;
  }
  return candidatePageNum;
};

