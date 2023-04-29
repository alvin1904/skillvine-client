import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/student/ViewCertificates.module.css";
import DropDown from "@/components/DropDown";
import { getRandomNumber } from "@/utils/getRandomNumber";
import { status, useCustomError } from "@/components/ErrorHandler/ErrorContext";
import { levels, levels2, levels3, statuses } from "@/constants/data";

export default function Filters({ setFilterUpdate }) {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const [clearSelection, setClearSelection] = useState(0);
  const { throwError } = useCustomError();

  const [arr1, setArr1] = useState(levels);
  const [arr2, setArr2] = useState([
    "National Initiatives",
    "Sports & Games",
    "Cultural & Literary",
  ]);

  const [arr3, setArr3] = useState(statuses);
  const handleClear = () => {
    setFilterUpdate({});
    return setClearSelection(getRandomNumber(1, 10));
  };
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
    let theFilter = {};
    if (!ref1.current || !ref2.current || !ref3.current) return ErrorAction();
    const [t1, t2, t3] = findValues([ref1, ref2, ref3], [arr1, arr2, arr3]);
    if (t1 === "" && t2 === "" && t3 === "") return ErrorAction();
    console.log([t1, t2, t3]);
    if (levels2.includes(t1))
      theFilter = { level: levels2.indexOf(t1) + 1, isLeadership: false };
    else if (levels3.includes(t1))
      theFilter = { level: levels3.indexOf(t1) + 1, isLeadership: true };
    else throwError("Invalid filter option", status.WARNING);
    if(statuses.includes(t3)) theFilter = {...theFilter, status: t3.toLowerCase()};
    setFilterUpdate(theFilter);
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
