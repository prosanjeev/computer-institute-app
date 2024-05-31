import data from "../../../../../components/state-wise-cities-data/data";

export const PersonalInformation = [
  {
    label: "Director Name",
    name: "directorName",
    type: "text",
  },
  {
    label: "Gender",
    name: "gender",
    type: "select",
    options: ["Male", "Female", "Other"],
  },
  {
    label: "Primary Phone",
    name: "primaryPhone",
    type: "text",
  },
  {
    label: "Email ID",
    name: "email",
    type: "email",
  },
  {
    label: "Address Proof",
    name: "documentType",
    type: "select",
    options: ["Aadhar Card", "Voter Card", "Passport"],
  },
  {
    label: "Document Id Number",
    name: "documentNumber",
    type: "text",
  },
];

export const centerInformation = [
  {
    label: "Center Name",
    name: "centerName",
    type: "text",
  },
  {
    label: "Office Phone",
    name: "officePhone",
    type: "text",
  },
  {
    label: "Select State",
    name: "state",
    type: "select",
    options: data.states,
    // onChange: handleStateChange,
  },
  {
    label: "Select City",
    name: "district",
    type: "select",
    // options: cities,
    // onChange: handleCityChange,
  },
  {
    label: "Police Station",
    name: "policeStation",
    type: "text",
  },
  {
    label: "Pin Code",
    name: "pinCode",
    type: "text",
  },
  {
    label: "Center Place",
    name: "centerPlace",
    type: "text",
  },
  {
    label: "Wathsapp No.",
    name: "wathsappPhone",
    type: "text",
  },
  {
    label: "Center Logo",
    name: "logo",
    type: "file",
  },
  {
    label: "Center Director Signature",
    name: "signature",
    type: "file",
  },
];

export const UserCradesial = [
  {
    label: "User Name",
    name: "userName",
    type: "text",
    readOnly: true,
  },
  {
    label: "Password",
    name: "password",
    type: "password",
  },
];


export const ListOfRequirements = [
  {
    label: "Center Logo",
    name: "logo",
    type: "file",
    accept: "image/*"
  },

  {
    label: "Center Director Signature",
    name: "signature",
    type: "file",
    accept: "image/*"
  },
  // {
  //   label: "Center Director Adhar Card",
  //   name: "aadharcard",
  //   type: "file",
  // },
];


