import React from "react";
import Image from "next/image";
import styles from "@/styles/student/Profile.module.css";
import defaultPic from "/public/assets/defaultPic.png";
import { status, useCustomError } from "@/components/ErrorHandler/ErrorContext";

export default function ProfileComponent({
  profilePic,
  name,
  email,
  college,
  admissionNumber,
  ktuId,
  batch,
  id,
}) {
  const { throwError } = useCustomError();
  const handleDelete = () => {
    if (!id) return throwError("Please try again later!", status.INFO);
    throwError(
      `This feature is not available yet for the id: ${id}`,
      status.INFO
    );
  };
  return (
    <div className={styles.profile}>
      <div className={styles.profile_dp}>
        {<Image src={profilePic || defaultPic} height={250} width={250} />}
      </div>
      <div className={styles.profile_name}>
        <h5>{name && "Welcome,"}</h5>
        <h1>{name}</h1>
        <div className={styles.email}>{email && <>({email})</>}</div>
      </div>
      <div className={styles.profile_numbers}>
        <div className={styles.clg}>{college}</div>
        {batch && ktuId && admissionNumber && (
          <>
            <div>Batch of study: {batch}</div>
            <div>KTU ID: {ktuId}</div>
            <div>Adm No: {admissionNumber}</div>
          </>
        )}
      </div>
      <div className={styles.danger_zone}>
        <h3>Danger Zone</h3>
        <h6>
          Deleting this account is a permanent and irreversible action. Once you
          delete your account, all of your certificates and information will be
          deleted along with it, and there is no way to retrieve it.
        </h6>
        <button className={styles.delete} onClick={handleDelete}>
          DELETE ACCOUNT
        </button>
      </div>
    </div>
  );
}
