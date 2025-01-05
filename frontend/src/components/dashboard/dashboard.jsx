import React, { useState } from "react";
import SideBar from "../conferencing/sidebar";
import { dashboardLinks } from "../../constants";

const DashboardNav = () =>{
    return <div className="bg-white w-full border-b">
        <h1 className="text-black p-2 mx-9 mb">Company Logo</h1>
    </div>
}

const Dashboard = ()=>{
    const [current, setCurrent] = useState()
    return <div className="h-lvh flex flex-col text-white bg-[#bfdbfe]">
        <DashboardNav />
        <SideBar classname = "w-[12rem] h-lvh bg-white text-black" sessions={false} links = {dashboardLinks} />
    </div>
}


export default Dashboard;