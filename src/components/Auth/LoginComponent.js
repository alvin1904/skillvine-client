import React, { useRef } from "react";
import styles from "@/styles/auth.module.css";
import { status, useCustomError } from "../ErrorHandler/ErrorContext";
import DropDown from "../DropDown";
import { FcGoogle } from "react-icons/fc";
import { loginOptions } from "@/constants/data";

export default function LoginComponent() {
  const { throwError } = useCustomError();
  const ref = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loginOptions.toString().replace(",", "") == ref.current.innerText)
      return throwError("Select an option!", status.WARNING);
    if (ref.current.innerText === loginOptions[0])
      window.location.href = process.env.NEXT_PUBLIC_STUDENT_LOGIN;
    else if (ref.current.innerText === loginOptions[1])
      window.location.href = process.env.NEXT_PUBLIC_TEACHER_LOGIN;
  };

  return (
    <form className={styles.login_card} onSubmit={handleSubmit}>
      <div className={styles.login_card_header}>Login</div>
      <DropDown
        array={loginOptions}
        defaultText="Select login mode"
        ulRef={ref}
      />
      <button type="submit" className={styles.login_btn}>
        <div className={styles.login_btn_section}>
          <FcGoogle />
        </div>
        <div className={styles.login_btn_section}>
          Login with Institution Email
        </div>
      </button>
    </form>
  );
}
