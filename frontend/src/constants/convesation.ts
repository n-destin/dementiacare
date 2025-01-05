export const conversations = [
    {
      lastMessage: "Hey! Are you free for lunch?",
      image: "avatar-john.png",
      groupname: "",          // Empty if it's a direct (1:1) conversation
      firstname: "John",
      lastname: "Doe",
      unseenMessagesCount: 2,
      lastMessageTime: "Today 3:45 pm",
    },
    {
      lastMessage: "Don’t forget the meeting notes!",
      image: "avatar-jane.png",
      groupname: "",
      firstname: "Jane",
      lastname: "Smith",
      unseenMessagesCount: 1,
      lastMessageTime: "Monday 10:00 am",
    },
    {
      lastMessage: "Can you review the latest design?",
      image: "avatar-dave.png",
      groupname: "",
      firstname: "Dave",
      lastname: "Johnson",
      unseenMessagesCount: 3,
      lastMessageTime: "Friday 6:15 pm",
    },
    
  ];


export const group_conversations = [
    {
        lastMessage: "Let's celebrate the successful launch! 🎉",
        image: "group-launch.png",
        groupname: "Launch Squad",
        firstname: "", 
        lastname: "",
        unseenMessagesCount: 5,
        lastMessageTime: "Thursday 9:45 pm",
      },
      {
        lastMessage: "We need to finalize the project by tomorrow.",
        image: "group-team.png",
        groupname: "Product Team", // Non-empty if it's a group conversation
        firstname: "", 
        lastname: "",
        unseenMessagesCount: 0,
        lastMessageTime: "Yesterday 2:10 pm",
      },
  ]
  