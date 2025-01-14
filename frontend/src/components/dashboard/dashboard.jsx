import React, { useState } from "react";
import SideBar from "../conferencing/sidebar";
import { dashboardLinks } from "../../constants";
import Patients from "./patients";
import { handleStartCall } from "../conferencing/conferencing";
import NewPatient from "./newpatient";


const DashboardNav = () =>{
    return <div className="bg-white w-full border-b">
        <h1 className="text-black p-2 mx-9 mb">Company Logo</h1>
    </div>
}

const Dashboard = ()=>{
    const [current, setCurrent] = useState("patients")
    return <div className="h-lvh flex flex-col bg-[#bfdbfe]">
        <DashboardNav />
        <div className="flex h-lvh">
            <SideBar classname = "w-[12rem] bg-white text-black" sessions={false} links = {dashboardLinks} callFunction={handleStartCall} />
            {current === "patients" && <Patients /> }
        </div>
    </div>
}


export default Dashboard;