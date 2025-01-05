import React, { useRef, useState } from "react";
import NavBar from "./navbar";
import SideBar from "./sidebar";
import { sessionLittleNavElements } from "../../constants";
import { Link, useLocation } from "react-router";
import { ChatWindow } from "./LittleComponets";
import { sidebarLinks, sessionLinks } from "../../constants";
import { Button } from "../authentication/buttons";
import Conference from "./conference";



const RightSideBar = ({person}) =>{
    const location = useLocation()
    const pathname = location.pathname;
    const [current, setCurrent] = useState("chat")

    
   return (<section className="w-[20rem] bg-white m-1 rounded text-black">
        <nav className="p-4 flex justify-evenly  border-b border-">
            {sessionLittleNavElements.map((navLink) => (
                <Link to="" className={`${navLink === "chat" ? 'ml-4' : navLink === "Calls" ? 'mr-4' : "m-0"}`} onClick={undefined}>{navLink}</Link>
            ))}
        </nav>
        {current === "chat" ? <ChatWindow /> : ""}
    </section>
   )
}

const Session = () =>{
    const now = new Date();
    const time = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });
    const date = new Intl.DateTimeFormat("en-US", {
        dateStyle: "full",
    }).format(now);
    const [meetingState, setMeetingState] = useState(undefined);
    const [calling, setCalling] = useState(false)

    const handleCalling = () =>{
      setCalling(true)
    }


  return (
    <section className="h-lvh flex flex-col text-white  bg-[#bfdbfe]">
      <NavBar />
      <div className="h-full flex flex-row w-full rounded-[20px] bg-hero bg-cover">
        <SideBar calling = {calling} callFunction={handleCalling} classname = {`w-[20rem] bg-white m-1 rounded text-black`} sessions={true} links = {sessionLinks} person={{name : "Firstname Lastname", image : undefined, condition : "condition ", age: 24, gender : "M", dateofbirth : "Feb 2002"}}  />
        <div id="session" className={`${calling ? "w-[60rem]" : " bg-white w-[90%] rounded m-1 h-[45.5rem]"}`} >
          {calling ? <Conference startcall={calling} /> : ""}
        </div>
        {calling && <RightSideBar />}
      </div>
    </section>
  );
};

export default Session;
