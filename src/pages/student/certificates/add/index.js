
import Addcertificate from "@/componentsUser/certificate/Addcertificate";
import StudentLayout from "@/layouts/StudentLayout";
import React from "react";

export default function addCertificates() {
  return (
    <StudentLayout>
      <div className="add_certificate">
       <Addcertificate />
      </div>
    </StudentLayout>
  );
}
