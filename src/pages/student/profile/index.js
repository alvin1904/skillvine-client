"use client";

import React, { useEffect, useState } from "react";
import StudentLayout from "@/layouts/StudentLayout";
import useAxiosCaller from "@/utils/useAxiosCaller";
import { fetchProfileAPI } from "@/apis";
import { useCustomError } from "@/components/ErrorHandler/ErrorContext";
import Loadings from "@/components/Loading/Loadings";
import ProfileComponent from "@/componentsUser/profile/ProfileComponent";
import Head from "next/head";

export default function profile() {
  const { loading, fetchData } = useAxiosCaller();
  const [data, setData] = useState({});
  const { throwError } = useCustomError();
  const fetchProfileData = async () => {
    const response = await fetchData(fetchProfileAPI);
    if (response.status === 200) {
      setData(response.data);
    } else throwError(response.status || response.response.status);
  };
  useEffect(() => {
    fetchProfileData();
  }, []);
  if (!data || loading)
    return (
      <StudentLayout>
        <div className="dashboard">
          <Loadings color="var(--clr-primary-300)"/>
        </div>
      </StudentLayout>
    );
  else
    return (
      <StudentLayout>
        <Head>
          <title>Profile</title>
        </Head>
        <div className="dashboard">
          <ProfileComponent
            profilePic={data.profileImage}
            name={data.name}
            email={data.email}
            college={data.college}
            admissionNumber={data.admissionNumber}
            ktuId={data.ktuId}
            batch={data.batch}
            id={data._id}
          />
        </div>
      </StudentLayout>
    );
}
