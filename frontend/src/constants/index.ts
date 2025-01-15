export const sidebarLinks = [
    {
        label : 'Home', 
        route : '/home', 
    }, 
    {
        label : 'Upcoming', 
        route : '/upcoming', 
    }, 
    {
        label : 'Previous',
        route : '/previous', 
    },
    {
        label : 'Recordings', 
        route : '/recordings', 
    }, 
    {
        label : 'Personal Room', 
        route : '/personal-room', 
    }
]

export const sessionLinks = ["Demographics", "Medical History", "Appointment", "Lab Test Reports", "Treatment Care Plan", "Reports"]
export const sessionLittleNavElements = ["Chat", "Notes", "Calls"]
export const dashboardLinks = ["Schedule", "Tasks", "Patients", "Colleagues", "Reports", "Finance", "Dynamic Forms", "Literature"]
export const patientInfoFields = [
    { name: 'legalFirstName', label: 'Legal First Name', type: 'text' },
    { name: 'legalMiddleName', label: 'Middle', type: 'text' },
    { name: 'legalLastName', label: 'Last', type: 'text' },
    { name: 'legalSuffix', label: 'Suffix', type: 'text' },
    { name: 'preferredName', label: 'Preferred Name', type: 'text', placeholder: '(Optional)' },
    { name: 'pronouns', label: 'Pronouns', type: 'text' },
    { name: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
    { name: 'address1', label: 'Address 1', type: 'text' },
    { name: 'address2', label: 'Address 2', type: 'text' },
    { name: 'zip', label: 'Zip', type: 'text' },
    { name: 'city', label: 'City/State', type: 'text' },
  ];
  
  // export const contactFields = [
  //   { name: 'timeZone', label: 'Time Zone', type: 'select', options: ['Not Set (Use practice time zone)', 'Eastern', 'Central', 'Mountain', 'Pacific'] },
  //   { name: 'mobilePhone', label: 'Mobile Phone', type: 'text', placeholder: 'No messages' },
  //   { name: 'homePhone', label: 'Home Phone', type: 'text', placeholder: 'No messages' },
  //   { name: 'workPhone', label: 'Work Phone', type: 'text', placeholder: 'No messages' },
  //   { name: 'otherPhone', label: 'Other Phone', type: 'text', placeholder: 'No messages' },
  //   { name: 'email', label: 'Email', type: 'email' },
  // ];
  
  export const demographicFields = [
    {
      name: 'administrativeSex',
      label: 'Administrative Sex',
      type: 'select',
      options: ['Male', 'Female', 'Unknown'],
    },
    {
      name: 'genderIdentity',
      label: 'Gender Identity',
      type: 'select',
      options: [
        '-- Select Gender Identity --',
        'Agender',
        'Cisgender',
        'Genderfluid',
        'Genderqueer',
        'Non-binary',
        'Transgender',
      ],
    },
    {
      name: 'sexualOrientation',
      label: 'Sexual Orientation',
      type: 'select',
      options: [
        '-- Select Sexual Orientation --',
        'Heterosexual',
        'Homosexual',
        'Bisexual',
        'Pansexual',
        'Asexual',
      ],
    },
    { name: 'race', label: 'Race', type: 'text', placeholder: 'Add Race' },
    { name: 'ethnicity', label: 'Ethnicity', type: 'text', placeholder: 'Add Ethnicity' },
    { name: 'languages', label: 'Languages', type: 'text', placeholder: 'Add Language' },
    {
      name: 'maritalStatus',
      label: 'Marital Status',
      type: 'select',
      options: ['-- Select Marital Status --', 'Single', 'Married', 'Divorced', 'Widowed'],
    },
    {
      name: 'employment',
      label: 'Employment',
      type: 'select',
      options: ['-- Select Employment --', 'Employed', 'Unemployed', 'Student', 'Retired'],
    },
    {
      name: 'religiousAffiliation',
      label: 'Religious Affiliation',
      type: 'text',
      placeholder: 'Add Religious Affiliation',
    },
    {
      name: 'HIPAA',
      label: 'HIPAA',
      type: 'select',
      options: [
        'Signed HIPAA NPP on file (Warning - Important for your practice)',
        'Not signed',
      ],
    },
    {
      name: 'PCPRelease',
      label: 'PCP Release',
      type: 'select',
      options: [
        'Not set (Warning - Important for your practice)',
        'Release on file',
        'Refused release',
      ],
    },
    {
      name: 'smokingStatus',
      label: 'Smoking Status',
      type: 'select',
      options: [
        '-- Select Smoking Status --',
        'Current smoker',
        'Former smoker',
        'Never smoked',
      ],
    },
  ];
  


  export const patientRegistrationForm = {
    "Legal Name": {
      inputs: [
        { type: "text", placeholder: "First name", width: 10 },
        { type: "text", placeholder: "Last name", width: 6 },
      ]
    },
    "Preferred Name": {
      inputs: [
        { type: "text", placeholder: "Optional", width: 10 }
      ]
    },
    "Pronouns": {
      inputs: [
        { type: "text", placeholder: "", width: 10 }
      ]
    },
    "Date of Birth": {
      inputs: [
        { type: "date", placeholder: "m/d/yyyy", width: 12 }
      ]
    },
    "Address 1": {
      inputs: [
        { type: "text", placeholder: "Address 1", width: 25 }
      ]
    },
    "Address 2": {
      inputs: [
        { type: "text", placeholder: "Address 2", width: 25 }
      ]
    },
    "Zip": {
      inputs: [
        { type: "text", placeholder: "zip code", width: 10 }
      ]
    },
    "City/State": {
      inputs: [
        { type: "text", placeholder: "city/state", width: 20 }
      ]
    },
    "Time Zone": {
      inputs: [
        { 
          type: "select", 
          options: [
            "-- Select Time Zone --",
            "Not Set (Use practice time zone)",
            "UTC−12:00", 
            "UTC−11:00", 
            "UTC−10:00" 
            /* ... more time zones ... */
          ], 
          width: 20 
        }
      ]
    },
    "Mobile Phone": {
      inputs: [
        { type: "tel",  width: 15 }, 
        { 
          type: "select", 
          options: [
            "-- Select Message Preference --",
            "Voice messages OK", 
            "Text messages OK", 
            "Voice/Text messages OK"
          ]
        }
      ]
    },
    "Home Phone": {
      inputs: [
        { type: "tel",  width: 15 },
        { 
          type: "select",
          options: [
            "-- Select Message Preference --",
            "Voice messages OK", 
            "Text messages OK", 
            "Voice/Text messages OK"
          ]
        }
      ]
    },
    "Work Phone": {
      inputs: [
        { type: "tel",  width: 15 },
        { 
          type: "select",
          options: [
            "-- Select Message Preference --",
            "Voice messages OK", 
            "Text messages OK", 
            "Voice/Text messages OK"
          ]
        }
      ]
    },
    "Other Phone": {
      inputs: [
        { type: "tel",  width: 15 },
        { 
          type: "select",
          options: [
            "-- Select Message Preference --",
            "Voice messages OK", 
            "Text messages OK", 
            "Voice/Text messages OK"
          ]
        }
      ]
    },
    "Email": {
      inputs: [
        { type: "email", placeholder: "", width: 25 }
      ]
    },
    "Administrative Sex": {
      inputs: [
        { 
          type: "select", 
          options: [
            "-- Select Administrative Sex --",
            "Male", 
            "Female", 
            "Unknown"
          ], 
          width: 15 
        }
      ]
    },
    "Gender Identity": {
      inputs: [
        { 
          type: "select", 
          options: [
            "-- Select Gender Identity --",
            "Male", 
            "Female", 
            "Non-binary", 
            "Other", 
            "Prefer not to say"
          ], 
          width: 20 
        }
      ]
    },
    "Sexual Orientation": {
      inputs: [
        { 
          type: "select", 
          options: [
            "-- Select Sexual Orientation --",
            "Heterosexual", 
            "Homosexual", 
            "Bisexual", 
            "Other", 
            "Prefer not to say"
          ], 
          width: 20 
        }
      ]
    },
    "Race": {
      inputs: [
        { 
          type: "select", 
          options: [
            "-- Select Race --",
            "American Indian or Alaska Native",
            "Asian",
            "Black or African American",
            "Native Hawaiian or Other Pacific Islander",
            "White",
            "Other"
          ], 
          width: 15 
        }
      ]
    },
    "Ethnicity": {
      inputs: [
        { 
          type: "select", 
          options: [
            "-- Select Ethnicity --",
            "Hispanic or Latino",
            "Not Hispanic or Latino",
            "Prefer not to say",
            "Other"
          ], 
          width: 15 
        }
      ]
    },
    "Languages": {
      inputs: [
        { 
          type: "select", 
          options: [
            "-- Select Language --",
            "English",
            "Spanish",
            "French",
            "Mandarin",
            "Other"
          ], 
          width: 15 
        }
      ]
    },
    "Marital Status": {
      inputs: [
        { 
          type: "select", 
          options: [
            "-- Select Marital Status --",
            "Single", 
            "Married", 
            "Divorced", 
            "Widowed", 
            "Domestic Partnership", 
            "Other"
          ], 
          width: 20 
        }
      ]
    },
    "Employment": {
      inputs: [
        { 
          type: "select", 
          options: [
            "-- Select Employment --",
            "Employed", 
            "Unemployed", 
            "Retired", 
            "Student", 
            "Other"
          ], 
          width: 20 
        }
      ]
    },
    "Religious Affiliation": {
      inputs: [
        { 
          type: "select", 
          options: [
            "-- Select Religious Affiliation --",
            "Christianity",
            "Islam",
            "Hinduism",
            "Buddhism",
            "Judaism",
            "Atheist/Agnostic",
            "Other"
          ], 
          width: 20 
        }
      ]
    },
    "HIPAA": {
      inputs: [
        { 
          type: "checkbox", 
          name: "Signed HIPAA NPP on file",
          additionalInfo: "Warning - Important for your practice",
          width: "auto"  
        }
      ]
    },
    "PCP Release": {
      inputs: [
        { 
          type: "select", 
          options: [
            "-- Select PCP Release --",
            "Not set", 
            "Signed", 
            "Pending"
          ], 
          additionalInfo: "Warning - Important for your practice",
          width: 20 
        }
      ]
    },
    "Smoking Status": {
      inputs: [
        { 
          type: "select", 
          options: [
            "-- Select Smoking Status --",
            "Never smoked", 
            "Former smoker", 
            "Current smoker", 
            "Unknown"
          ], 
          width: 20 
        }
      ]
    }
  };
  
  
  

  export const patients_navigation = [
    {name : "Search: ", type : "text", classname : "text-sm px-2 py-1 border outline-none rounded"}, 
    {name : "Assigned To: ", type : "select", options : ["--Select--", "Therapist one", "Therapist two"], classname : "text-sm px-2 py-1 border outline-none rounded w-[16 ]"}, 
    {name : "Filter: ", type : "select", options : ["--Select--", "Active", "Inactive", "Need Information Entered", "Nedd appointment in next week"], classname : "text-sm px-2 py-1 border outline-none rounded w-[20 ]"}] 
  
  
  export const patients_table = ["Patient name", "Date of Birth", "Phone number", "Last appointmnet", "Upcoming appointment", "Clinians",]