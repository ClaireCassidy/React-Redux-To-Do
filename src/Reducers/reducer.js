import { actionTypes } from "../action-types";
import { INITIAL_STATE, PAGE_CHANGE_DIRECTIONS } from "../constants.js";


//@TODO: Refactor reducer methods to use getIndexById
// @TODO: Combine reducers?

export const rootReducer = (state = INITIAL_STATE, action) => {
  //console.log("Initial state: " + JSON.stringify(INITIAL_STATE));
  //console.log("Action types: " + JSON.stringify(actionTypes));

  switch (action.type) {
    case actionTypes.ADD_ITEM: {
      console.log(`Adding this item: ${JSON.stringify(action.payload)}`);
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
      //console.log(`Deleting item w id ${action.payload}`);
      let todosCopy = [...state.todos];
      let id = action.payload;

      let index = -1;
      for (let i = 0; i < todosCopy.length; i++) {
        if (todosCopy[i].id === id) {
          index = i;
          break;
        }
      }

      //console.log(JSON.stringify(todosCopy));
      //console.log(`Found todo item w id ${id} @ index ${index}`);
      todosCopy.splice(index, 1);

      return Object.assign({}, state, {
        todos: todosCopy,
      });
    }
    case (actionTypes.TOGGLE_COMPLETE): {
      const id = action.payload;
      let todosCopy = [...state.todos];

      // console.log("Toggling completed status of item w id "+id);

      let index = -1;
      for (let i = 0; i<todosCopy.length; i++) {
        if (todosCopy[i].id === id) {
          index = i;
          break;
        }
      }

      // console.log("Found target @ index "+index);

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
      // console.log(JSON.stringify(itemCopy));

      itemCopy.expires = null;
      todosCopy.splice(index, 1, itemCopy);

      return Object.assign({}, state, {
        todos: todosCopy
      });

    }
    case (actionTypes.UPDATE_EXPIRY): {

      // console.log(JSON.stringify(action));
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
      console.log("Looking for item with id "+id);

      const todosCopy = [...state.todos];
      const index = getTodoIndexById(todosCopy, id);
      console.log(`Item w id ${id} @ index ${index}`);

      const itemCopy = Object.assign({}, todosCopy[index]);
      console.log("The item:"+JSON.stringify(itemCopy));
      itemCopy.text = newTodoText;

      todosCopy.splice(index, 1, itemCopy);

      return Object.assign({}, state, {
        todos: todosCopy
      });
    }
    case (actionTypes.UPDATE_ITEMS_PER_PAGE): {
      // console.log(action.payload);
      return Object.assign({}, state, {
        itemsPerPage: action.payload,
        pageIndex: 0
      })
    }
    case (actionTypes.UPDATE_PAGE_NUMBER): {
      // console.log("Updating Page Number: "+action.payload);

      let updatedValue = 0;

      switch (action.payload) {
        case PAGE_CHANGE_DIRECTIONS.NEXT:
          updatedValue = state.pageIndex + 1;
          break;
        case PAGE_CHANGE_DIRECTIONS.PREV:
          updatedValue = state.pageIndex - 1;
          break;
        default:
          updatedValue = validatePageNumber(action.payload, state.itemsPerPage, state.todos.length);
          // console.log(`Candidate Page Index : ${action.payload}\nAdjusted Page Index: ${updatedValue}`);
          break;
      }

      // console.log("Updating page index to be: "+updatedValue);

      return Object.assign({}, state, {
        pageIndex: updatedValue,
      });
    }
    case (actionTypes.DELETE_ALL_EXPIRED): {
      const todosCopy = [...state.todos];
      
      const curTimeUnix = Date.now();
      console.log(`Cur Time Unix: ${curTimeUnix}`);

      const nonExpiredItems = todosCopy.filter((item, index) => {
        const itemsExpiry = item.expires;
        if (itemsExpiry) {
          console.log(`Item @ index ${index} expires: ${itemsExpiry}`);
          const itemsExpiryUnix = Date.parse(itemsExpiry);
          if (curTimeUnix - itemsExpiryUnix <= 0) return true;
        } else {
          return true;
        }
        return false;
      });

      console.log("Non-Expired Items: "+JSON.stringify(nonExpiredItems));
      return Object.assign({}, state, {
        todos: nonExpiredItems
      })
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

// check the page number is within bounds and if not return the closest valid page number
// passed a 0-indexed page number
const validatePageNumber = (candidatePageNum, itemsPerPage, numTodos) => {
  if (candidatePageNum < 0) {
    return 0;
  } else {
    let maxPageIndex = Math.ceil(numTodos / itemsPerPage) - 1;
    console.log(`Max page num : ${maxPageIndex}`);
    if (candidatePageNum > maxPageIndex) return maxPageIndex;
  }
  return candidatePageNum;
}