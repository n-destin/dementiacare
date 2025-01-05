import { initCall } from "../components/conferencing/actions"

export const meetingTypes = [
    {
        heading : 'New Meeting', 
        color : "#e67e22",
        icon : '/icons/upcoming.svg', 
        description : 'Set up a new meeting', 
        handleClick : initCall
    }, 
    {
        heading : 'Join Meeting', 
        color : "#2e86c1",
        icon : '/icons/upcoming.svg', 
        description : 'Via invitation link', 
        handleClick : ()=>{return undefined}
    }, 
    {
        heading : 'Schedule Meeting', 
        color : "#7d3c98",
        icon : '/icons/upcoming.svg', 
        description : 'Plan your meeting',
        handleClick : ()=>{return undefined}
    }, 
    {
        heading : 'View Recordings', 
        color : "#f1c40f",
        icon : '/icons/upcoming.svg', 
        description : 'Meeting recordings',
        handleClick : ()=>{return undefined}
    }, 
]