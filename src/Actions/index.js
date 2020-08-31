import { actionTypes } from '../action-types'

export const submitNewTodo = (newTodo) => {
    return {
        type: actionTypes.ADD_ITEM,
        payload: newTodo
    }
}