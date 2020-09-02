import { actionTypes } from '../action-types'

export const submitNewTodo = (newTodo) => {
    return {
        type: actionTypes.ADD_ITEM,
        payload: newTodo
    }
}

export const toggleImportant = (index) => {
    return {
        type: actionTypes.TOGGLE_IMPORTANT,
        payload: index
    }
}

export const deleteItem = (index) => {
    return {
        type: actionTypes.DELETE_ITEM,
        payload: index
    }
}