import {
  MdHome,
  MdLibraryAdd,
  MdLibraryBooks,
  MdContacts,
} from "react-icons/md";
import { GoSignOut } from "react-icons/go";

export const studentNavbar = [
  { icon: MdHome, page: "/student/dashboard" },
  { icon: MdLibraryBooks, page: "/student/certificates" },
  { icon: MdLibraryAdd, page: "/student/certificates/add" },
  { icon: MdContacts, page: "/student/profile" },
  { icon: GoSignOut, page: "/login" },
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
// LOGIN PAGE
export const loginOptions = ["Login as a student", "Login as a teacher"];
