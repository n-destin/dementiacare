import React, { ReactNode } from "react";
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
//   } from "@/components/ui/dialog"
  

interface MeetingModelProps {
    isOpen : boolean;
    onClose : () => void;
    title : string;
    className : string;
    children? : ReactNode;
    handleClick : () => void; 
    buttonText : string;
    image : string;
    buttonIcon : string
}

const MeetingModel = ({isOpen, onClose, title, className, children, handleClick, buttonText, image, buttonIcon} : MeetingModelProps) =>{
    return(
        <div></div>
        // <Dialog open = {isOpen} onOpenChange = {onClose}>
        //     <DialogTrigger>Open</DialogTrigger>
        //     <DialogContent className = "flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9">
        //         <div className="flex flex-col gap-x-6">
        //             {image && (
        //                 <div className="flex justify-center">
        //                     <img src = {image} alt = "image" width = {72} height = {72} />
        //                 </div>
        //             )}
        //             <h1 className={cn("text-3xl font-bold leading-[42px]", className)}>{title}</h1>
        //             {children}
        //             <button onClick = {handleClick} className = "bg-blue-1 focus-visible:ring-0 *:focus-visible:ring-offset-0">
        //                 {buttonIcon && (
        //                     <img  src ={buttonIcon} alt = "buttonIcon"
        //                     width = {13}
        //                     height = {13}/>
        //                 )} &nbsp;
        //                 {buttonText || "Schedule Meeting"}
        //             </button>
        //         </div>
        //     </DialogContent>
        // </Dialog>

    )
}

export default MeetingModel;