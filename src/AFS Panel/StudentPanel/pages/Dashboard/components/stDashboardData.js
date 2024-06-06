import { FaFileAlt, FaRegNewspaper } from 'react-icons/fa';
import { PiBookOpenBold, PiBookOpenTextLight } from 'react-icons/pi';
import { TbLayoutDashboard } from 'react-icons/tb';
import { MdOutlineContactMail } from "react-icons/md";
import { GrCertificate } from 'react-icons/gr';
import { TiBusinessCard } from "react-icons/ti";
import { IoPaperPlaneOutline } from "react-icons/io5";

const iconMapping = {
  Dashboard: TbLayoutDashboard,
  Icard: TiBusinessCard,
  Subject: PiBookOpenTextLight,
  Books: PiBookOpenBold,
  "Main Test": GrCertificate,
  Contact: MdOutlineContactMail,
  'Practice Test': IoPaperPlaneOutline,
  'News Notice': FaRegNewspaper,
  SYLLABUS: FaFileAlt,
};

export const stDashboardData = [

  {
    name: "Dashboard",
    icon: iconMapping["Dashboard"],
  },
  {
    name: "E Books",
    icon: iconMapping["Books"],
  },
  {
    name: "Icard",
    icon: iconMapping["Icard"],
  },

  {
    name: "Subject",
    icon: iconMapping["Subject"],
  },
  {
    name: "Practice Test",
    icon: iconMapping["Practice Test"],
  },
  {
    name: "Main Test",
    icon: iconMapping["Main Test"],
  },
  {
    name: "Notice",
    icon: iconMapping['News Notice'],
  },
  {
    name: "Contact Us",
    icon: iconMapping['Contact'],
  },

];