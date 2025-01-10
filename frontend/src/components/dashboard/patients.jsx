import React from "react"
import { patients_navigation, patients_table } from "../../constants"


const Input = ({element}) =>{
    if(element.type === "select"){
        return (
            <div className="flex text-sm gap-2" >
                <label className="mt-1" htmlFor={element.name}>{element.name}</label>
                    <select className={element.classname} name={element.name} id={element.name}>
                        {element.options.map(option =>{
                            return <option value={option}>{option}</option>
                        })}
                    </select>
            </div>
            
        )
    }
    return (
        <div className="flex text-sm gap-2">
            <label className="mt-1" htmlFor={element.name}>{element.name}</label>
            <input type={element.type} name = {element.name} className={element.classname}/>
        </div>
    )
}

const Navigation = () =>{
    return <div className="bg-transparent">
    <div className="flex p-3 border justify-evenly m-0.5 bg-white rounded">
      {patients_navigation.map(navigation_element => {
        return <Input element={navigation_element} />;
      })}
      <button className="border py-1 px-3 bg-slate-100 ml-4 rounded text-sm">Search</button>
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
    return <div className="bg-transparent w-full">
        <Navigation />
        <PatientsList patients = {patients} navigation_content={patients_table} />
    </div>
}


export default Patients;