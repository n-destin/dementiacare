import React from "react";
import { createRoot } from "react-dom/client"
import './style.css'
import App from './components/app'
import { Provider } from "react-redux";
import { action_types } from "./actions/actions";
import store from "./store";


const token = localStorage.getItem("token")
if (token){
    store.dispatch({type : action_types.AUTHENTICATE_USER})
}

const root = createRoot(document.getElementById('main'))

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
)