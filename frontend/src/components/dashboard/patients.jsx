import React, { useState } from 'react';
import { patientInfoFields, contactFields, demographicFields, formFields } from '../../constants';
import { Add01Icon, AddSquareIcon } from 'hugeicons-react';

export const NewButton = ({ buttonname, onClick }) => {
    return (
        <div className="flex items-center bg-gray-100 text-blue-700 rounded px-3 py-1">
            <Add01Icon className="mr-2" />
            <button onClick={onClick} className="text-sm font-medium">{buttonname}</button>
        </div>
    );
};

const InputField = ({ label, name, type, value, onChange, options, placeholder }) => {
    if (type === "select") {
        return (
            <div className="">
                <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-1">
                    {label}
                </label>
                <select
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-blue-300"
                >
                    <option value="">-- Select --</option>
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        );
    }

    return (
        <div className="">
            <label htmlFor={name} className="block text-sm font-semibold text-gray-700">
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder || ''}
                className="w-full border border-gray-300 rounded outline-none text-sm px-2 py-1"
            />
        </div>
    );
};

const BusinessContactForm = () => {
    const [formData, setFormData] = useState({
        contactName: {
            first: "",
            middle: "",
            last: "",
            suffix: "",
        },
        title: "",
        company: "",
        contactType: "PCP",
        relationship: "",
        releaseOfInfo: false,
        signedOn: "",
        dateOfBirth: "",
        address: {
            address1: "",
            address2: "",
            country: "USA",
            zip: "",
            city: "",
            state: "",
        },
        timeZone: "",
        phoneNumbers: {
            mobile: "",
            home: "",
            work: "",
            fax: "",
        },
        email: "",
        comments: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const [section, key] = name.split(".");

        if (key) {
            setFormData({
                ...formData,
                [section]: {
                    ...formData[section],
                    [key]: value,
                },
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted", formData);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Business Contact Form</h2>
            {formFields.map((field) => {
                const value = field.section
                    ? formData[field.section][field.name]
                    : formData[field.name];

                return (
                    <InputField
                        key={field.name}
                        label={field.label}
                        name={field.section ? `${field.section}.${field.name}` : field.name}
                        type={field.type}
                        value={value}
                        onChange={handleInputChange}
                        options={field.options}
                    />
                );
            })}
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
                Submit
            </button>
        </form>
    );
};

const NewPatient = () => {
    const [new_contact, setNewContact] = useState(false);
    const [formData, setFormData] = useState({
        patientComments: '',
        legalFirstName: '',
        legalMiddleName: '',
        legalLastName: '',
        legalSuffix: '',
        preferredName: '',
        pronouns: '',
        dateOfBirth: '',
        address1: '',
        address2: '',
        zip: '',
        city: '',
        state: '',
        timeZone: '',
        mobilePhone: '',
        homePhone: '',
        workPhone: '',
        otherPhone: '',
        email: '',
        administrativeSex: '',
        genderIdentity: '',
        sexualOrientation: '',
        race: '',
        ethnicity: '',
        languages: '',
        maritalStatus: '',
        employment: '',
        religiousAffiliation: '',
        HIPAA: false,
        PCPRelease: '',
        smokingStatus: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted", formData);
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg"
        >
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Patient: Add a New Patient</h1>

            <div className="mb-6">
                <label htmlFor="patientComments" className="block text-sm font-semibold text-gray-700 mb-2">
                    Patient Comments
                </label>
                <textarea
                    id="patientComments"
                    name="patientComments"
                    value={formData.patientComments}
                    onChange={handleChange}
                    placeholder="For non-clinical info such as scheduling/billing comments."
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300"
                    rows="3"
                />
            </div>

            <hr className="my-4" />

            <h2 className="text-xl font-semibold text-gray-800 mb-4">Patient Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {patientInfoFields.map((field) => (
                    <InputField
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        type={field.type}
                        value={formData[field.name]}
                        onChange={handleChange}
                        options={field.options}
                    />
                ))}
            </div>

            <hr className="my-4" />

            <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contactFields.map((field) => (
                    <InputField
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        type={field.type}
                        value={formData[field.name]}
                        onChange={handleChange}
                        options={field.options}
                    />
                ))}
            </div>

            <hr className="my-4" />

            <h2 className="text-xl font-semibold text-gray-800 mb-4">Demographics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {demographicFields.map((field) => (
                    <InputField
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        type={field.type}
                        value={formData[field.name]}
                        onChange={handleChange}
                        options={field.options}
                    />
                ))}
            </div>

            <div className="mt-6 flex items-center gap-4">
                {!new_contact  && <NewButton buttonname="New Contact" onClick={() => setNewContact(true)} />}
                {new_contact && <BusinessContactForm />}
            </div>

            <div className="mt-8 flex gap-4">
                <button 
                    type="submit" 
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                >
                    Save New Patient
                </button>
                <button 
                    type="button" 
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
                >
                    Save and Create Another
                </button>
                <button 
                    type="button" 
                    className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default NewPatient;
