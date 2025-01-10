import React, { useEffect, useState } from "react";
import {BrowserRouter, Routes, Route, NavLink, useNavigate} from 'react-router-dom';
import Login from "./authentication/login";
import Session from "./conferencing/Home";
import Register from "./authentication/signup";
import ChatRoom from "./chat/chatroom";
import Dashboard from "./dashboard/dashboard";
import Conference from "./conferencing/conference";
import Protected from "./authentication/protected";
import { useSelector } from "react-redux";
import NewPatient from "./dashboard/patients";
import Patients from "./dashboard/patients";

const FallBack = () =>{

    const[isAuthenticated, setisAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(()=>{
        setLoading(false)
    }, [])

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
    const isauthenticated = useSelector(store=>{return store.authentication.authenticated})    
    return(
        <BrowserRouter>
            <Routes>
                <Route element = {<Protected isauthenticated = {isauthenticated} path = "/login"  />}>
                    <Route path="/session" element={<Session />} />
                    <Route path="/chatroom" element = {<ChatRoom />} />
                    <Route path="/dashboard" element = {<Dashboard />} />
                    <Route path="/conference" element = {<Conference />} />
                    <Route path="/patients" element ={<Patients />}/>
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register/>} />
            </Routes>
        </BrowserRouter>

    )
}

export default App;