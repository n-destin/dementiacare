import React, { useState, useEffect } from 'react';
import { patientRegistrationForm } from '../../constants';
import { Input } from './patients';
import { create_something } from '../../actions/actions';
import { useDispatch } from "react-redux";


const NewPatient = () => {
  const formKeys = Object.keys(patientRegistrationForm);
  const adminIndex = formKeys.indexOf("Administrative Sex");
  const dispatch = useDispatch()

  const initialPatientInformation = Object.fromEntries(
    Object.entries(patientRegistrationForm).map(([label, fieldData]) => [label, ""])
  );  


  initialPatientInformation["Firstname"] = ""
  initialPatientInformation["Lastname"] = ""

  const beforeAdminEntries = Object.entries(patientRegistrationForm).slice(0, adminIndex);
  const afterAdminEntries = Object.entries(patientRegistrationForm).slice(adminIndex);

  const [patientInformation, setPatientInformation] = useState(initialPatientInformation);

  const handleChange = (fieldname, value) => {
    setPatientInformation((prev) => ({
      ...prev,
      [fieldname]: value,
    }));
  };

  useEffect(() => {
    console.log(patientInformation);
  }, [patientInformation]);

  return (
    <div className="m-1 rounded-sm space-y-4 bg-white flex p-9 h-[90%] mt-6 shadow-[0px_5px_15px_rgba(0,0,0,0.35)]">
      <div>
        {beforeAdminEntries.map(([label, fieldData]) => (
          <div key={label} className="flex items-center m-2 mr-9">
            <div className="w-32 text-sm">{label}</div>
            {fieldData.inputs.map((input, idx) => (
              <div key={idx} className="flex ml-2">
                <Input
                  element={{
                    ...input,
                    classname: `p-0.5 rounded-sm border text-sm outline-none w-${input.width}`,
                    handleChangeFunction: handleChange,
                    fieldname: label != "Legal Name" ? label : label == "Legal Name" && idx == 0 ? "Firstname" : "Lastname",
                    ...(idx === 0 && { name: undefined }),
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div>
        {afterAdminEntries.map(([label, fieldData]) => (
          <div key={label} className="flex items-center mb-2">
            <div className="w-32 text-sm">{label}</div>
            {fieldData.inputs.map((input, idx) => (
              <div key={idx} className="flex ml-2">
                <Input
                  element={{
                    ...input,
                    classname: `p-0.5 border rounded-sm text-xs outline-none w-[${input.width}rem]`,
                    handleChangeFunction : handleChange,
                    fieldname: label != "Legal Name" ? label : label == "Legal Name" && idx == 0 ? "Firstname" : "Lastname",
                    ...(idx === 0 && { name: undefined }),
                  }}
                />
              </div>
            ))}
          </div>
        ))}
        <button
          onClick={()=>{
            const handleSubmit = create_something('authenticate/register/patient/', patientInformation,  "CREATE_PATIENT", (dispatch, navigate)=>{
                return None
              })
              handleSubmit(dispatch)
          }}
          className="mt-12 bg-blue-200 p-2 px-8 rounded-sm"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default NewPatient;
