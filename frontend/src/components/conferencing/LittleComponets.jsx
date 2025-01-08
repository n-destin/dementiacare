import React from "react";
import { useState } from "react";
import { TestTube01Icon } from "hugeicons-react";
// import { CallBlocked02Icon, HiMicrophone, HiCamera, HiVolumeUp } from "hugeicons-react";

export const UpcomingSession  = (session) =>{
    return <div className="">

    </div>
}

export const BottomTest = ({test}) =>{
    return (
        <div className="">

        </div>
    )
}

export const  Bottom = ({tests, reports})=>{
    return(
        <div className="">
            <div id="Lab tests" className="">
                <div>
                    <TestTube01Icon />
                    <div>
                        <h2 className="font-semibold">Lab Tests</h2>
                        <p className="text-sm">{tests?.length}</p>
                    </div>
                </div>
                <div id="content" className="">
                    {tests.map(test =>{
                        return <BottomTest test = {test}/>
                    })}
                </div>
                
            </div>
            <div id="Reports" className="">

            </div>
        </div>
    )
}



export const Notes = () =>{
    return(
        <div>

        </div>
    )
}

export const Calls = () =>{
    return(
        <div>

        </div>
    )
}

export const ChatWindow = (messages) =>{
    const [input, setInput] = useState("")
    const handleSend = ()=>{
        if(input.trim() !== " "){
            //send message
        }
    }
    return <div className="rounded relative bg-slate-200 h-96 p-2 m-1">
            <div className="">

            </div>
            <div className="flex">
                <input type="text" className="bg-white p-2 text-sm w-11/12 absolute bottom-2 rounded outline-none" placeholder="Type your message here... "/>
                {/* <div className="bg-[#bfdbfe] rounded p-2 ml-3">
                    <Mic02Icon size={30} color="white" variant= "solid" className="" />
                </div> */}
            </div>
</div>
}


export const Controls = () => {
    return (
      <div className="flex items-center space-x-4">
        <button className="flex items-center rounded-full bg-gray-200 p-2 hover:bg-gray-300">
          <HiMicrophone />
        </button>
        <button className="flex items-center rounded-full bg-gray-200 p-2 hover:bg-gray-300">
          <HiCamera />
        </button>
        <button className="flex items-center rounded-full bg-gray-200 p-2 hover:bg-gray-300">
          <HiVolumeUp />
        </button>
      </div>
    );
  };