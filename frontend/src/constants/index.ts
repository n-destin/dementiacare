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
  
  export const contactFields = [
    { name: 'timeZone', label: 'Time Zone', type: 'select', options: ['Not Set (Use practice time zone)', 'Eastern', 'Central', 'Mountain', 'Pacific'] },
    { name: 'mobilePhone', label: 'Mobile Phone', type: 'text', placeholder: 'No messages' },
    { name: 'homePhone', label: 'Home Phone', type: 'text', placeholder: 'No messages' },
    { name: 'workPhone', label: 'Work Phone', type: 'text', placeholder: 'No messages' },
    { name: 'otherPhone', label: 'Other Phone', type: 'text', placeholder: 'No messages' },
    { name: 'email', label: 'Email', type: 'email' },
  ];
  
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

  export const formFields = [
    { section: "contactName", label: "First Name", name: "first", type: "text" },
    { section: "contactName", label: "Middle Name", name: "middle", type: "text" },
    { section: "contactName", label: "Last Name", name: "last", type: "text" },
    { section: "contactName", label: "Suffix", name: "suffix", type: "text" },
    { label: "Title", name: "title", type: "text" },
    { label: "Company", name: "company", type: "text" },
    {
      label: "Contact Type",
      name: "contactType",
      type: "select",
      options: ["PCP", "Emergency Contact", "Guardian", "Responsible Party for Billing"],
    },
    { label: "Relationship", name: "relationship", type: "text" },
    { label: "Release of Info (Signed On)", name: "signedOn", type: "date" },
    { label: "Date of Birth", name: "dateOfBirth", type: "date" },
    { section: "address", label: "Address 1", name: "address1", type: "text" },
    { section: "address", label: "Address 2", name: "address2", type: "text" },
    { section: "address", label: "Country", name: "country", type: "text" },
    { section: "address", label: "Zip", name: "zip", type: "text" },
    { section: "address", label: "City", name: "city", type: "text" },
    { section: "address", label: "State", name: "state", type: "text" },
    { label: "Time Zone", name: "timeZone", type: "text" },
    { section: "phoneNumbers", label: "Mobile Phone", name: "mobile", type: "text" },
    { section: "phoneNumbers", label: "Home Phone", name: "home", type: "text" },
    { section: "phoneNumbers", label: "Work Phone", name: "work", type: "text" },
    { section: "phoneNumbers", label: "Fax", name: "fax", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Comments", name: "comments", type: "textarea" },
  ];