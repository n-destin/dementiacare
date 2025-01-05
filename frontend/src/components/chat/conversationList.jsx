import React from "react";
import { UserIcon } from "hugeicons-react";

// Conversation component
const Conversation = ({
  lastMessage,
  image, 
  groupname,
  firstname, 
  lastname,
  unseenMessagesCount,
  lastMessageTime,
}) => {
    console.log(lastMessage,
        image, 
        groupname,
        firstname, 
        lastname,
        unseenMessagesCount,
        lastMessageTime,);
    
  return (
    <div className="hover:bg-slate-100 cursor-pointer rounded flex items-center justify-between p-2 border-b border-gray-200">
      <div className="flex items-center space-x-2">
        {image ? (
          <img
            alt="profile"
            src={image}
            className="rounded-full w-8 h-8"
          />
        ) : <UserIcon />}

        <div>
          {groupname != "" ? (
            <h3 className="font-semibold">
              {groupname}
            </h3>
          ) : (
            <h3 className="font-semibold">{firstname} {lastname}</h3>
          )}
          <p className="text-gray-500 text-xs max-w-40 truncate">{lastMessage}</p>
        </div>
      </div>

      <div className="text-right">
        <p className="text-xs text-gray-400">{lastMessageTime}</p>
        {unseenMessagesCount > 0 && (
          <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {unseenMessagesCount}
          </span>
        )}
      </div>
    </div>
  );
};

export const ConversationList = ({ conversations, type }) => {
  return (
    <div className={`grow overflow-y-auto p-3 m-2 font-semibold rounded ${type === "rooms" ? "h-64" : "h-96"} bg-white box-shadowrgba(149, 157, 165, 0.2) 0px 8px 24px;]`}>
    <p className="self-end">{type === "rooms" ? "Rooms" : "People"}</p>
      {conversations && conversations.map((conversation) => (
        <Conversation
          key={conversation.id}
          firstname = {conversation.firstname}
          lastname  = {conversation.lastname}
          lastMessage={conversation.lastMessage}
          groupname={conversation.groupname}
          unseenMessagesCount={conversation.unseenMessagesCount}
          lastMessageTime={conversation.lastMessageTime}
        />
      ))}
    </div>
  );
};

export default ConversationList;
