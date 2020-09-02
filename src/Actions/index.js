import { actionTypes } from '../action-types'

export const submitNewTodo = (newTodo) => {
    return {
        type: actionTypes.ADD_ITEM,
        payload: newTodo
    }
}

export const toggleImportant = (id) => {
    return {
        type: actionTypes.TOGGLE_IMPORTANT,
        payload: id
    }
}

export const deleteItem = (id) => {
    return {
        type: actionTypes.DELETE_ITEM,
        payload: id
    }
}

export const toggleComplete = (id) => {
    return {
        type: actionTypes.TOGGLE_COMPLETE,
        payload: id
    }
}

export const removeExpiry = (id) => {
    return {
        type: actionTypes.REMOVE_EXPIRY,
        payload: id
    }
}

export const updateExpiry = (payload) => {
    return {
        type: actionTypes.UPDATE_EXPIRY,
        payload: payload
    }
}