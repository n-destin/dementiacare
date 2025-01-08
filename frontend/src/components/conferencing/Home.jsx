import React, { useRef, useState } from "react";
import NavBar from "./navbar";
import SideBar from "./sidebar";
import { sessionLittleNavElements } from "../../constants";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { ChatWindow } from "./LittleComponets";
import { sidebarLinks, sessionLinks } from "../../constants";
import { Button } from "../authentication/buttons";
import Conference from "./conference";
import { 
  Mic01Icon, 
  MicOff01Icon, 
  Camera01Icon, 
  CameraOff01Icon, 
  VolumeHighIcon, 
  VolumeMute01Icon, 
  CallEnd02Icon, 
  ComputerIcon
} from 'hugeicons-react';


const Controls = () => {
  
};


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
    const [micOn, setMicOn] = useState(true);
    const [camOn, setCamOn] = useState(true);
    const [volumeOn, setVolumeOn] = useState(true);
    const handleCalling = () =>{
      setCalling(true)
    }

  const controls = [
    {
      iconOn: <VolumeHighIcon />,
      iconOff: <VolumeMute01Icon />,
      state: volumeOn,
      setState: setVolumeOn,
    },
    {
      iconOn: <Camera01Icon />,
      iconOff: <CameraOff01Icon />,
      state: camOn,
      setState: setCamOn,
    },
    {
      iconOn: <CallEnd02Icon/>,
      iconOff : undefined, 
      endCall : true,
      state : calling, 
      setState: setCalling
    },
    {
      iconOn: <Mic01Icon />,
      iconOff: <MicOff01Icon />,
      state: micOn,
      setState: setMicOn,
    },
    {
      iconOn: <ComputerIcon />,
      iconOff : undefined, 
      state : true, 
      onClick: () => console.log("Starting screen share...") 
    },
  ];
    

  return (
    <section className="h-lvh flex flex-col text-white  bg-[#bfdbfe]">
      <NavBar />
      <div className="h-full flex flex-row w-full rounded-[20px] bg-hero bg-cover">
        <SideBar calling = {calling} callFunction={handleCalling} classname = {`w-[20rem] bg-white m-1 rounded text-black`} sessions={true} links = {sessionLinks} person={{name : "Firstname Lastname", image : undefined, condition : "condition ", age: 24, gender : "M", dateofbirth : "Feb 2002"}}  />
        <div
            id="session"
            className={`${
              calling ? "w-[60rem]" : "w-[90%]"
            } flex flex-col items-center`} // Added flex and items-center
          >
            {calling ? <Conference startcall={calling} /> : ""}
            {calling && 
            <div className="mx-auto flex place-items-center rounded bg-white p-2 w-[20rem] shadow-md mt-9">
              {controls.map((control, index) => (
                <button
                  key={index}
                  className={`flex ${
                    control.endCall
                      ? "rounded bg-red-500"
                      : "rounded-full bg-slate-300"
                  } p-2 ml-4`}
                  onClick={() => control.setState(!control.state)}
                >
                  {control.state ? control.iconOn : control.iconOff}
                </button>
              ))}
            </div> }
          </div> 
        {calling && <RightSideBar />}
      </div>
    </section>
  );
};

export default Session;
