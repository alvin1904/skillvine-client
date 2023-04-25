import { useRouter } from "next/router";
import React from "react";
import { BsCaretRightFill } from "react-icons/bs";

export default function CTAButtons() {
  const router = useRouter();
  const goToView = () => router.push("/student/certificates");
  const goToProfile = () => router.push("/student/profile");
  return (
    <>
      <button onClick={goToView}>
        <h1>View all your certificates</h1>
        <div>
          <BsCaretRightFill />
        </div>
      </button>
      <button onClick={goToProfile}>
        <h1>View your profile</h1>
        <div>
          <BsCaretRightFill />
        </div>
      </button>
    </>
  );
}
