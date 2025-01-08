import { initCall } from "../components/conferencing/actions"
import { 
    Mic01Icon, 
    MicOff01Icon, 
    Camera01Icon, 
    CameraOff01Icon, 
    VolumeHighIcon, 
    VolumeMute01Icon, 
  } from 'hugeicons-react';

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

const controls = [
    {
      iconOn: <Mic01Icon />,
      iconOff: <MicOff01Icon />,
      state: micOn,
      setState: setMicOn,
    },
    {
      iconOn: <Camera01Icon />,
      iconOff: <CameraOff01Icon />,
      state: camOn,
      setState: setCamOn,
    },
    {
      iconOn: <VolumeHighIcon />,
      iconOff: <VolumeMute01Icon />,
      state: volumeOn,
      setState: setVolumeOn,
    },
  ];