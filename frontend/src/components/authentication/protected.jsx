import React from "react";
import { Navigate, Outlet } from "react-router";


const Protected = (props) =>{
    return (
        props.isauthenticated ? <Outlet /> : <Navigate to = {props.path}/>
)
}

export default Protected;