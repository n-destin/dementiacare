import React, { useEffect, useState } from "react";
import ConversationList from "./conversationList";
import { Search01Icon, Attachment01Icon, Mic02Icon, SmileIcon, Camera01Icon } from "hugeicons-react";
import { Button } from "../authentication/buttons";
import { conversations, group_conversations } from "../../constants/convesation";
import { io } from "socket.io-client";
// import * as dotenv from "dotenv"

const API_URL = "http://127.0.0.1:8000/api/"
const SOCKET_URL = "http://localhost:3001"

const socket = io(SOCKET_URL, {
    auth : {
        offset : 0
    }
})
const user_id = localStorage.getItem("person_id")

const Message = ({message}) => {
    return <div>
        <div className="">
            {content}
        </div>
        <div className={`rounded-full ${message.sender_id === user_id ? "self-start" : "self-end"} `}></div>
    </div>
}

export const ChatWindow = (messages) =>{
    return <div className="h-full w-full bg-white rounded p-3 m-2 relative">
            <div className="">

            </div>
            <div className="flex absolute bottom-10 left-20">
                <button className="bg-slate-100 rounded mr-[-5px]"><Attachment01Icon size={50} className=" p-3" /></button>
                <input type="text" className="bg-slate-100 w-[40rem] p-3 rounded outline-none" placeholder="Type your message here... "/>
                <button className="bg-slate-100 rounded ml-[-5px]"><SmileIcon size={50} className=" p-3" /></button>
                <button className="bg-slate-100 rounded ml-[-5px]"><Camera01Icon size={50} className=" p-3" /></button>
                <div className="bg-[#bfdbfe] rounded p-2 ml-3">
                    <Mic02Icon size={30} color="white" variant= "solid" className="" />
                </div>
            </div>
</div>
}



const ChatRoom = ()=>{
    const [messages, setMessages] = useState([])
    useEffect(()=>{
        socket.on("connection", (data)=>{
            
        })
        socket.on('chat message', (message, offset) =>{
            setMessages([...messages, message])
            socket.auth.offset = offset 
        })
    }, [])
    return (
        <div className="flex h-lvh bg-gradient-to-b from-[#bfdbfe] to-white p-6">
            <div className="w-[39%]">
                <div className="flex m-2">
                    <Search01Icon size = {40} className="bg-white p-3 rounded mr-[-5px]" />
                    <input type="text" name="search" id="name" className="w-full box-shadowrgba(149, 157, 165, 0.2) 0px 8px 24px;] rounded outline-none" placeholder="Search"/>
                </div>
                <div className="">

                    <div>
                        <ConversationList type = "people"
                        conversations = {conversations}
                        onSelect={undefined}
                        onNew={()=>{setShowNewConversation(true)}}/>
                    </div>
                    <div>
                        <ConversationList type = "rooms"
                        conversations = {group_conversations}
                        onSelect={undefined}
                        onNew={()=>{setShowNewConversation(true)}}/>
                    </div>
                </div>
            </div>
            <ChatWindow />
            
        </div>
    ) 
}

export default ChatRoom;