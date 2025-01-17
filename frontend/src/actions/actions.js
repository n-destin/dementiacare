import axios from "axios";
import { useEffect } from "react";
const ROOT_URL = import.meta.env.VITE_API_URL
const api_key = "?key=destin_niyomufasha"

export const action_types = {
    AUTHENTICATE_USER : "AUTHENTICATE_USER",
    DE_AUTHENTICATE_USER : "DE_AUTHENTICATE_USER",
    UPDATE_CONVERSATIONS : "UPDATE_CONVERSATIONS",
    SEND_MESSAGE : "SEND_MESSAGE",
    AUTHENTICATION_ERROR : "AUTHENTICATION_ERROR", 
    UPDATE_MESSAGES : 'UPDATE_MESSAGES',
    UPDATE_CONVERSATION_KEY : "UPDATE_CONVERSATION_KEY"
 }

 export const register_patient = (information, navigate) =>{
    return (dispatch) =>{
        axios.post(`${ROOT_URL}register/patient`, information).then(response=>{
            if(response){
                console.log(response.data)
            }
        }).catch(error =>{
            console.log(error)
            // dispatch({
            //     type : action_types.DE_AUTHENTICATE_USER, 
            //     payload : response.data.error
            // })
        })
    }
 }

 export function authenticate_user(credentials, navigate){
    return (dispatch) =>{
        axios.post(`${ROOT_URL}authenticate/login/`, credentials).then((response)=>{
            if(response){
                dispatch({
                    type : action_types.AUTHENTICATE_USER, 
                    payload : {userid : response.data.user_id, username : response.data.username}
                })
                localStorage.setItem("token", response.data.access)
                localStorage.setItem('user_information', response.data.user_id)
                navigate("/chatroom")
            }
        }).catch((error)=>{
            dispatch({
                type : action_types.AUTHENTICATION_ERROR, 
                payload  : error.response
            })
        })
    }

 }

 export function updateMessages(messages){
    return (dispatch)=>{
        dispatch({
            type : action_types.UPDATE_MESSAGES, 
            payload : messages
        })
    }
 }


 export function get_conversations(){
    return (dispatch)=>{
        axios.get(`${ROOT_URL}/conversation/all`, {headers : {"Authorization" : `Token ${localStorage.getItem('token')}`}}).then((response)=>{
            dispatch({
                type : action_types.UPDATE_CONVERSATIONS,
                payload : response.data.conversations
            })
        })
    }
 }

export function update_conversation_key(conversationKey){
    return (dispatch)=>{
        dispatch({
            type : action_types.UPDATE_CONVERSATION_KEY,
            payload : conversationKey
        })
    }
}

export const create_something = (endpoint, payload, redux_action, functions)=>{
    return (dispatch)=>{
        console.log(ROOT_URL, endpoint)
        axios.post(`${ROOT_URL}${endpoint}`, {...payload, "userid" : localStorage.getItem('user_information')}, {headers : {"Authorization" : `Token ${localStorage.getItem("token")}`}}).then((response) =>{
            if (response){
                dispatch({
                    type : action_types[redux_action], 
                    payload : response.data
                })
                functions(dispatch, response);   
            }
        }).catch(error=>{
            dispatch({
                type : action_types.DE_AUTHENTICATE_USER,
                payload : error.response.data
            })
        })
    }
}

export function create_conversation(conversation_name){
    return (dispatch)=>{
        axios.post(`${ROOT_URL}/conversation/create`, {conversation_name : conversation_name}, {headers : {"Authorization" : `Token ${localStorage.getItem("token")}`}}).then((response)=>{
            dispatch({
                type : action_types.UPDATE_CONVERSATIONS,
                payload : response.data.conversations
            })
            const updateConversationKeyHandler = updateConversationKey(response.data.conversationKey)
            const updateMessagesHandler =  updateMessages(response.data.messages)
            updateConversationKeyHandler(dispatch)
            updateMessagesHandler(dispatch)
        }).catch((error)=>{
            dispatch({
                type : action_types.AUTHENTICATION_ERROR, 
                payload  : error.response.data
            })
        })
    }
 }


 export function create_user(credentials, navigate){    
    return (dispatch)=>{
        axios.post(`${ROOT_URL}authenticate/register/`, credentials).then((response)=>{
            if(response){
                // get conversations and partients and 
                dispatch({
                    type : action_types.AUTHENTICATE_USER
                })
                localStorage.setItem("token", response.data.userToken)
                navigate("/login")
            }
        }).catch((error)=>{
            dispatch({
                type : action_types.AUTHENTICATION_ERROR, 
                payload  : error.response.data
            })
        })
    }
 }



 export function handleMessageSend(conversation_key, message){
    return (dispatch)=>{
        axios.post(`${ROOT_URL}/messages/new`, {conversation_key : conversation_key, content : message}, {headers : {"Authorization" : `Token ${localStorage.getItem("token")}`}}).then((response)=>{
            dispatch({
                type : action_types.UPDATE_MESSAGES,
                payload : response.data.messages
            })
        }).catch((error)=>{
            console.log("something wrong happenend", error);
        })
    }
 }

 export function handleSelection(conversation_key){
    return (dispatch)=>{
        axios.get(`${ROOT_URL}/messages/all`, {
            params: { conversationKey: conversation_key },
            headers: { "Authorization": `Token ${localStorage.getItem("token")}` }
        }).then((response)=>{
            console.log(response.data);
            dispatch({
                type: action_types.UPDATE_MESSAGES,
                payload: response.data.messages
            })

            const keyUpdate = updateConversationKey(conversation_key)
            keyUpdate(dispatch)
            
        })
    }
}

