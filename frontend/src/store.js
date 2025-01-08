import { configureStore } from "@reduxjs/toolkit";
import {rootReducer} from "./reducers/root_reducer.js"

export default configureStore({
    reducer :  rootReducer
})