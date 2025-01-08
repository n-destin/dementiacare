import React from "react";
import { sessionLinks } from "../../constants";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { UserIcon, RecordIcon, DashboardSpeed01Icon, WorkHistoryIcon, TreatmentIcon, TestTube01Icon, SchoolReportCardIcon, InformationCircleIcon, InformationDiamondIcon} from "hugeicons-react";
import { Button } from "../authentication/buttons";
import { CallIcon } from "hugeicons-react";

const SideBar = ({person, links, classname, sessions, callFunction,calling}) =>{
    const location = useLocation()
    const pathname = location.pathname;
    
   return (<section className={classname} >
        <div >
            {person && 
            <div className="h-52 bg-white m-1">
                <h2 className="font-semibold px-3 pt-4 text-lg">
                    Patient Details
                </h2>
                    <div className="flex p-3">
                    <div className="rounded bg-slate-100 flex items-center justify-center"> 
                        {person.image ? <img src={person.image} alt="" className="w-full" /> : <UserIcon size ={70} className="p-4" />}
                    </div>
                    <div className='text-md gap-0 p-1 pt-3 ml-2'>
                        <p className="font-semibold m-0 p-0">{person.name}</p>
                        <p>{person.age} | {person.gender} | {person.dateofbirth}</p>
                    </div>
                        
                    </div>
                    <div className="bg-slate-200 m-3 h-16 p-1 rounded">
                        <p>Reason for visit : {person.condition}</p>
                    </div>
            </div> }
            {links.map((link) =>{
                const isActive = pathname === link || pathname.startsWith(link)
                return <Link to = {link.route} className = 'flex mt-4 ml-4 items-center rounded-lg justify-start hover:text-blue-400'>
                    {sessions ? link === "Demographics"? <InformationDiamondIcon /> : link === "Medical History" ? <WorkHistoryIcon /> : link === "Appointments"? <PreviousIcon /> : link === "Lab Test Reports" ? <TestTube01Icon /> : link === "Treatment Care Plan" ? <TreatmentIcon /> : <SchoolReportCardIcon /> : ""}
                    <p className="text-sm m-2 font-semibold max-lg:hidden">
                        {link}
                    </p>
                </Link>
            })}
            {!calling && <Link to={undefined} onClick={callFunction} className="flex mt-4 ml-4 items-center rounded-lg justify-start hover:text-blue-400">
                <CallIcon />
                <p className="text-sm m-2 font-semibold max-lg:hidden">
                    Call Patient
                </p>
            </Link>}
            {sessions && <Button Icon={undefined}  button_name={"Add Medications"} className={"bg-blue-300 text-white p-2 m-4 rounded"} />}
        </div>
    </section>
   )
}


export default SideBar;