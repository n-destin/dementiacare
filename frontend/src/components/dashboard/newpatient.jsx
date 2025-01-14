import React from 'react';
import { patientRegistrationForm } from '../../constants';
import { Input } from './patients';

const NewPatient = () => {
  // Get all keys and find the index of "Administrative Sex"
  const formKeys = Object.keys(patientRegistrationForm);
  const adminIndex = formKeys.indexOf("Administrative Sex");

  // Slice the entries up to (but not including) "Administrative Sex"
  const beforeAdminEntries = Object.entries(patientRegistrationForm).slice(0, adminIndex);
  const afterAdminEntries = Object.entries(patientRegistrationForm).slice(adminIndex, )

  return (
    <div className="m-1 rounded-sm space-y-4 bg-white flex p-9 h-[90%] mt-6 shadow-[0px_5px_15px_rgba(0,0,0,0.35)]">
        <div className=''>
            {beforeAdminEntries.map(([label, fieldData]) => (
            <div key={label} className="flex items-center m-2 mr-9">
                <div className="w-32 text-sm">
                {label}
                </div>
                {fieldData.inputs.map((input, idx) => {
                console.log(input.classname, "reached here")
                return (
                    <div key={idx} className="flex ml-2">
                    <Input 
                        element={{
                        ...input,
                        classname: `p-0.5 rounded-sm border text-sm outline-none w-${input.width}`,
                        ...(idx === 0 && { name: undefined })
                        }} 
                    />
                    </div>
                );
                })}
            </div>
        ))}
        </div>

        <div className=''>
            {afterAdminEntries.map(([label, fieldData]) => (
                <div key={label} className="flex items-center mb-2">
                    <div className="w-32 text-sm">
                    {label}
                    </div>
                    {fieldData.inputs.map((input, idx) => {
                    return (
                        <div key={idx} className="flex ml-2">
                        <Input 
                            element={{
                            ...input,
                            classname: `p-0.5 border rounded-sm border text-xs outline-none w-[${input.width}rem]`,
                            ...(idx === 0 && { name: undefined })
                            }} 
                        />
                        </div>
                    );
                    })}
                </div>
                ))}
                <button onClick={undefined} className='mt-12 bg-blue-200 p-2 px-8 rounded-sm'>Register</button>
        </div>
       
    </div>
  );
};

export default NewPatient;
