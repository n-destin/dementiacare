import React from "react";
import { Button } from "./buttons";
import { NextIcon } from "hugeicons-react";
import { useNavigate } from "react-router";

const AuthenticationNavigation = ({right_text}) =>{
    const navigate = useNavigate()
    return(
        <nav className={`flex p-10 w-full justify-between align-middle`}>
            <h2 className="ml-36">Company Name</h2>
            <div className="flex gap-5 font-semibold">
                <p className="font-normal">{right_text.before_button}</p>
                <Button  Icon = {NextIcon} button_name={right_text.button_name} className= "flex w-80" onClick={()=>{navigate(right_text.navigation)}}/>
            </div>
        </nav>
    )
}
export default AuthenticationNavigation;