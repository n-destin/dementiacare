import React, { useState } from "react"
import { patients_navigation, patients_table, patientRegistrationForm } from "../../constants"
import { register_patient } from "../../actions/actions"
import NewPatient from "./newpatient"


export const Input = ({element}) =>{
    if(element.type === "select"){
        return (
            <div className="flex text-sm gap-2" >
                <label className="mt-1" htmlFor={element.name}>{element.name}</label>
                    <select onChange={(event)=>{
                        console.log("element changed")
                        element.handleChangeFunction(element.fieldname, event.target.value)}} placeholder={element.placeholder} className={element.classname} name={element.name} id={element.name}>
                        {element.options.map(option =>{
                            return <option value={option}>{option}</option>
                        })}
                    </select>
            </div>
            
        )
    }else if (element.type === "checkbox") {
        return (
        <div className="flex items-center" style={{ width: element.width }}>
            <input 
            onChange={(event)=>{
                element.handleChangeFunction(element.fieldname, event.target.value)}} 
            type="checkbox" 
            className="mr-2"
            />
            <label htmlFor={element.name} className="mr-2">
            {element.name}
            </label>
            {element.additionalInfo && (
            <small className="text-gray-500">{element.additionalInfo}</small>
            )}
        </div>
        );
        }
        // {console.log(element.classname)}
    return (
        <div className="flex text-sm gap-2">
            <label className="mt-1" htmlFor={element.name}>{element.name}</label>
            <input onChange={(event)=>{
                console.log("input changed")
                element.handleChangeFunction(element.fieldname, event.target.value)}} placeholder={element.placeholder} type={element.type} name = {element.name} className={element.classname}/>
        </div>
    )
}

const Navigation = ({onclickFunction}) =>{

    return <div className="bg-transparent">
    <div className="flex p-3 border justify-evenly m-0.5 bg-white rounded">
      {patients_navigation.map(navigation_element => {
        return <Input element={navigation_element} />;
      })}
      <button className="border py-1 px-3 bg-slate-100 ml-4 rounded text-sm">Search</button>
      <button className="border py-1 px-3 bg-blue-300 ml-4 rounded text-sm" onClick={onclickFunction}>Add Patient</button>
    </div>
  </div>  
}

const PatientsList = ({ navigation_content, patients }) => {
    return (
        <div className="p-3 border m-0.5 bg-white rounded h-[91.5%]">
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        {navigation_content.map((header, index) => (
                            <th key={index} className="border border-gray-300 px-4 py-2">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                            {Object.values(patient).map((value, i) => (
                                <td key={i} className="border border-gray-300 px-4 py-2">
                                    {value}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const Patients = () =>{
    const patients = []
    const[adding, setAdding] = useState(false)

    return <div className="bg-transparent w-full">
        {adding ? 
        <div className="flex flex-col">
            <h1 className="text-lg mt-5 self-center">Patient Registration</h1>
            <NewPatient />
        </div> : 
        <div>
            <Navigation onclickFunction = {()=>{
                setAdding(true)}} />
            <PatientsList patients = {patients} navigation_content={patients_table} />
        </div>
        }
        
    </div>
}


export default Patients;