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

// LOGIN PAGE
export const loginOptions = ["Login as a student", "Login as a teacher"];
