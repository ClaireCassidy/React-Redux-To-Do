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

export const submitTextEdit = (payload) => {
    return {
        type: actionTypes.SUBMIT_TEXT_EDIT,
        payload: payload
    }
}

export const updateItemsPerPage = (noItems) => {
    return {
        type: actionTypes.UPDATE_ITEMS_PER_PAGE,
        payload: noItems
    }
}

export const changePageNumber = (payload) => {
    return {
        type: actionTypes.UPDATE_PAGE_NUMBER,
        payload: payload
    }
}

export const deleteExpiredTodos = () => {
    return {
        type: actionTypes.DELETE_ALL_EXPIRED
    }
}

export const deleteCompletedTodos = () => {
    return {
        type: actionTypes.DELETE_COMPLETED_TODOS
    }
}

export const setAutoDeleteCompleted = (payload) => {
    return {
        type: actionTypes.SET_AUTO_DELETE_COMPLETED,
        payload: payload
    }
}