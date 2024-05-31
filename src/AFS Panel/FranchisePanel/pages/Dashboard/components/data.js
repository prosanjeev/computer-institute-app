
import { FaCodeBranch, FaUserGraduate, FaBook, FaUserPlus, FaUser, FaUserTie, FaBookOpen, FaClipboardList, FaChalkboardTeacher, FaFileAlt, FaFileSignature } from 'react-icons/fa';

const iconMapping = {
  Branch: FaCodeBranch,
  Student: FaUserGraduate,
  Courses: FaBook,
  Admission: FaUserPlus,
  User: FaUser,
  Staff: FaUserTie,
  Subject: FaBookOpen,
  MARKSHEET: FaClipboardList,
  'VI CLASSES': FaChalkboardTeacher,
  'ST MATERIALS': FaFileAlt,
  'News Notice': FaFileSignature,
  SYLLABUS: FaFileAlt,
};

export const franchisedashboardData = [
  
  {
    name: "Student",
    info: "89",
    icon: iconMapping["Student"],
  },
  {
    name: "Courses",
    info: "9",
    icon: iconMapping["Courses"],
  },
  // {
  //   name: "Admission",
  //   info: "54",
  //   icon: iconMapping["Admission"],
  // },
  // {
  //   name: "User",
  //   info: "43",
  //   icon: iconMapping["User"],
  // },
  // {
  //   name: "Staff",
  //   info: "14",
  //   icon: iconMapping["Staff"],
  // },
  {
    name: "Subject",
    info: "22",
    icon: iconMapping["Subject"],
  },
  {
    name: "MARKSHEET",
    info: "53",
    icon: iconMapping["MARKSHEET"],
  },
  // {
  //   name: "VI CLASSES",
  //   info: "7",
  //   icon: iconMapping["VI CLASSES"],
  // },
  // {
  //   name: "ST MATERIALS",
  //   info: "16",
  //   icon: iconMapping["ST MATERIALS"],
  // },
  // {
  //   name: "News Notice",
  //   info: "7",
  //   icon: iconMapping["News Notice"],
  // },
  // {
  //   name: "SYLLABUS",
  //   info: "11",
  //   icon: iconMapping["SYLLABUS"],
  // },
];