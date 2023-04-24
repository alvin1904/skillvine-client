"use client";

import React from "react";
import StudentLayout from "@/layouts/StudentLayout";
import Certificates from "@/componentsUser/view/Certificates";
import Filters from "@/componentsUser/view/Filters";
import Indicators from "@/componentsUser/view/Indicators";
import SearchBar from "@/componentsUser/view/SearchBar";

export default function certificates() {
  return (
    <StudentLayout>
      <div className="add_certificate">
        <SearchBar />
        <Filters />
        <Indicators />
        <Certificates />
      </div>
    </StudentLayout>
  );
}
