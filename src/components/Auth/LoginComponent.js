import React, { useRef } from "react";
import styles from "@/styles/auth.module.css";
import { status, useCustomError } from "../ErrorHandler/ErrorContext";
import DropDown from "../DropDown";
import { FcGoogle } from "react-icons/fc";
import { loginOptions } from "@/constants/data";

export default function LoginComponent() {
  const { throwError } = useCustomError();
  const ref1 = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loginOptions.toString().replace(",", "") == ref1.current.innerText)
      return throwError("Select an option!", status.WARNING);
    alert(ref1.current.innerText);
  };
  return (
    <form className={styles.login_card} onSubmit={handleSubmit}>
      <div className={styles.login_card_header}>Login</div>
      <DropDown
        array={loginOptions}
        defaultText="Select login mode"
        ulRef={ref1}
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
