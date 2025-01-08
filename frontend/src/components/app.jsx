import React, { useEffect, useState } from "react";
import {BrowserRouter, Routes, Route, NavLink, useNavigate} from 'react-router-dom';
import Login from "./authentication/login";
import Session from "./conferencing/Home";
import Register from "./authentication/signup";
import ChatRoom from "./chat/chatroom";
import Dashboard from "./dashboard/dashboard";
import Conference from "./conferencing/conference";

const FallBack = () =>{

    const[isAuthenticated, setisAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(()=>{
        setLoading(false)
    }, [])

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


function App(props){

    const[isConnected, setisConnected] = useState(false)
    const[lastMessage, setLastMessage] = useState('');

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