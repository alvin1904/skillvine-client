import React, { useRef } from "react";
import styles from "@/styles/student/ViewCertificates.module.css";
import { IoSearchOutline } from "react-icons/io5";
import { status, useCustomError } from "@/components/ErrorHandler/ErrorContext";

export default function SearchBar({onSearch}) {
  const inputRef = useRef();
  const { throwError } = useCustomError();

  const handleSearch = (e) => {
    const searchParam = inputRef.current.value;
    e.preventDefault();
    if (searchParam.length <= 0) {
      throwError("Please enter a valid search parameter", status.WARNING);
      return;
    }
    onSearch(searchParam)
  };

  return (
    <form className={styles.addC_section} onSubmit={handleSearch}>
      <input
        className={styles.addC_input}
        type="text"
        placeholder="Search"
        ref={inputRef}
      />
      <button className={styles.addC_button} type="submit">
        <IoSearchOutline size={30} className={styles.addC_icon} />
      </button>
    </form>
  );
}
