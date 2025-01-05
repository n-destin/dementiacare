import { combineReducers } from "@reduxjs/toolkit"
import { authentication_reducer } from "./authentication_reducer"
import { conversations_reducer } from "./conversation_reducer"

export const rootReducer = combineReducers({
    authentication : authentication_reducer,
    conversation : conversations_reducer
})