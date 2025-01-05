import React from "react";
import { SassColor } from "sass";
import { UserAdd01Icon, Calendar01Icon, Camera01Icon, Add01Icon } from "hugeicons-react";


interface HomeProps {
    icon : string;
    header : string; 
    color: string, 
    description : string;
    handleClick : () => void;
}

const HomeCard = ({icon, header, description, color, handleClick} : HomeProps) =>{
    return(
        <div className={`bg-blue-300 px-4 py-6 flex flex-col justify-between w-full x:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer`}
                onClick={()=>{handleClick()}}>  
                <div className="flex-center rounded-[10px] w-fit p-2">
                    {header === "New Meeting" ? <Add01Icon size={40} /> : header === 'Join Meeting' ? <UserAdd01Icon size={40} /> : header === 'Schedule Meeting' ? <Calendar01Icon size={40} /> : <Camera01Icon size={40} />}
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-2xl font-bold" >{header}</h3>
                    <p className="text-lg font-normal">{description}</p>
                </div>
        </div> 
    )
}

export default HomeCard;