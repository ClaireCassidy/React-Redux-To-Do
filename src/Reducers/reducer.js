import { actionTypes } from '../action-types'
import { INITIAL_STATE } from '../constants.js'

export const rootReducer = (state = INITIAL_STATE, action) => {
    
    console.log("Initial state: "+JSON.stringify(INITIAL_STATE));
    console.log("Action types: "+JSON.stringify(actionTypes));

    switch (action.type) {
        case (actionTypes.ADD_ITEM):
            return Object.assign({}, state, {
                todos: [...state.todos, action.payload]
            });
        default:
            return state;
    }
}