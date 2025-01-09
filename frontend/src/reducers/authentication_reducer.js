import { produce } from "immer";
import { action_types } from "../actions/actions";

const initial_state = {authenticated : false}

export const authentication_reducer = produce((previousState, action)=>{
    switch(action.type){
        case action_types.AUTHENTICATE_USER:
            previousState.authenticated = true
            previousState.userinfo = action.payload
            break;
        case action_types.DE_AUTHENTICATE_USER:
            previousState.authenticated = false
            previousState.userinfo = undefined
            break
        case action_types.AUTHENTICATION_ERROR:
            previousState.authenticated = false
            previousState.userinfo = undefined
            break
        default:
            return previousState
    }
}, initial_state)