import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/student/ViewCertificates.module.css";
import DropDown from "@/components/DropDown";
import { getRandomNumber } from "@/utils/getRandomNumber";
import { status, useCustomError } from "@/components/ErrorHandler/ErrorContext";

export default function Filters() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const [clearSelection, setClearSelection] = useState(0);
  const { throwError } = useCustomError();

  const [arr1, setArr1] = useState([
    "Level 1",
    "Level 2",
    "Level 3",
    "Level 4",
    "Level 5",
    "Core-Coordinator",
    "Sub-Coordinator",
    "Volunteer",
  ]);
  const [arr2, setArr2] = useState([
    "National Initiatives",
    "Sports & Games",
    "Cultural & Literary",
  ]);

  const [arr3, setArr3] = useState(["Pending", "Approved", "Rejected"]);
  const handleClear = () => setClearSelection(getRandomNumber(1, 10));
  const ErrorAction = () =>
    throwError("Select a filter option", status.WARNING);

  // ON SUBMIT FUNCTIONS
  const findValues = (refs, arrays) => {
    return refs.map((ref, index) =>
      ref.current.innerText === arrays[index].toString().replace(/,/g, "")
        ? ""
        : ref.current.innerText
    );
    // Passing in 3 references and 3 filters to the function and
    // it will return an array of values after checking with the filters.
  };
  const handleFilter = () => {
    if (!ref1.current || !ref2.current || !ref3.current) return ErrorAction();
    const [t1, t2, t3] = findValues([ref1, ref2, ref3], [arr1, arr2, arr3]);
    if (t1 === "" && t2 === "" && t3 === "") return ErrorAction();
    console.log([t1, t2, t3]);
  };

  return (
    <div className={`${styles.addC_section} ${styles.addC_filters}`}>
      <DropDown
        array={arr1}
        defaultText="Select level or leadership"
        ulRef={ref1}
        clearSelection={clearSelection}
      />
      <DropDown
        array={arr2}
        defaultText="Select event category"
        ulRef={ref2}
        clearSelection={clearSelection}
      />
      <DropDown
        array={arr3}
        defaultText="Select certificate status"
        ulRef={ref3}
        clearSelection={clearSelection}
      />
      <button onClick={handleFilter} className={styles.filter_btn}>
        Apply
      </button>
      <button onClick={handleClear} className={styles.filter_btn}>
        Clear
      </button>
    </div>
  );
}
