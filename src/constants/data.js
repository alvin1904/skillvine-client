import {
  MdHome,
  MdLibraryAdd,
  MdLibraryBooks,
  MdContacts,
} from "react-icons/md";
import { GoSignOut } from "react-icons/go";

export const users = { STUDENT: "student", TEACHER: "teacher" };

export const studentNavbar = [
  { icon: MdHome, page: "/student/dashboard" ,name:"Home"},
  { icon: MdLibraryBooks, page: "/student/certificates" ,name:"View Certificates"},
  { icon: MdLibraryAdd, page: "/student/certificates/add" ,name:"Add Certificate"},
  { icon: MdContacts, page: "/student/profile" ,name:"Profile"},
  { icon: GoSignOut, page: "/login" ,name:"Sign Out"},
];

export const SelectMode = {
  BATCH: "batch",
  STUDENT: "student",
};

export const levels = [
  "Level 1",
  "Level 2",
  "Level 3",
  "Level 4",
  "Level 5",
  "Core-Coordinator",
  "Sub-Coordinator",
  "Volunteer",
];
export const statuses = ["Pending", "Approved", "Rejected"];

export const levels2 = ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"];
export const levels3 = ["Core-Coordinator", "Sub-Coordinator", "Volunteer"];
export const levelWithLeadership = "Leadership & Management";
export const yearOfStudy = [
  "First Year",
  "Second Year",
  "Third Year",
  "Fourth Year",
];

export const certificateStatus = {
  PENDING: {
    color: "var(--clr-light)",
    border: "var(--clr-primary-400)",
  },
  APPROVED: {
    color: "var(--clr-primary-800)",
    border: "var(--clr-primary-800)",
  },
  REJECTED: {
    color: "var(--clr-primary-300)",
    border: "var(--clr-primary-300)",
  },
};

export const certCompStatus = { MARK: "mark", VIEW: "view" };
// LOGIN PAGE
export const loginOptions = ["Login as a student", "Login as a teacher"];
