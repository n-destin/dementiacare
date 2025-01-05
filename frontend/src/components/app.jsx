import React, { useEffect, useState } from "react";
import {BrowserRouter, Routes, Route, NavLink, useNavigate} from 'react-router-dom';
import Login from "./authentication/login";
import Session from "./conferencing/Home";
import SideBar from "./conferencing/sidebar";
import Register from "./authentication/signup";
import { io } from 'socket.io-client'
import { handleCandidate, handleAnswer, handleOffer } from "./conferencing/actions";
import ChatRoom from "./chat/chatroom";
import Dashboard from "./dashboard/dashboard";
import Conference from "./conferencing/conference";

export const socket = io("http://localhost:8000")

const FallBack = () =>{

    const[isAuthenticated, setisAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    // useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged((user) => {
    //         setIsAuthenticated(!!user);
    //         setLoading(false);
    //     });
    //     return () => unsubscribe();
    // }, []);

    if(!isAuthenticated){
        navigate('/login')
    }

    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <div>URL Not found</div>
    )
}

export const sendMessage = (event, message)=>{
    socket.emit(event, message)
}


function App(props){

    const[isConnected, setisConnected] = useState(false)
    const[lastMessage, setLastMessage] = useState('');


    useEffect(()=>{
        socket.on("connect", ()=>{
            setisConnected(true)
        })
        socket.on('disconnect', ()=>{
            setisConnected(false);
        })
        socket.on('message', (message)=>{
            switch (message.type) {
                case 'offer':
                handleOffer(message.offer);
                break;
                case 'answer':
                handleAnswer(message.answer);
                break;
                case 'candidate':
                handleCandidate(message.candidate);
                break;
                default:
                getLastMessage(message.content)
                break;
            }
        })
    
        socket.on("disconnect", () => {
        console.log(socket.id); // undefined
        });
    }, [])


    return(
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register/>} />
                <Route path="/session" element={<Session />} />
                <Route path="/chatroom" element = {<ChatRoom />} />
                <Route path="/dashboard" element = {<Dashboard />} />
                <Route path="/conference" element = {<Conference />} />
            </Routes>
        </BrowserRouter>

    )
}

export default App;