import {
  MdHome,
  MdLibraryAdd,
  MdLibraryBooks,
  MdContacts,
} from "react-icons/md";

export const studentNavbar = [
  { icon: MdHome, page: "/student/dashboard" },
  { icon: MdLibraryBooks, page: "/student/certificates" },
  { icon: MdLibraryAdd, page: "/student/certificates/add" },
  { icon: MdContacts, page: "/student/profile" },
];

export const SelectMode = {
  BATCH: "batch",
  STUDENT: "student",
};
