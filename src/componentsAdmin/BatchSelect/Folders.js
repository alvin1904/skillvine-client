import React, { useState } from "react";
import Folder from "./Folder";
import styles from "@/styles/teacher/Selector.module.css";

export default function Folders({ array, changePage }) {
  const trimName = (name) => {
    const charLimit = 18;
    if (!name) return "";
    if (name.length > charLimit) return name.substring(0, charLimit) + "...";
    return name;
  };
  const [selected, setSelected] = useState("");
  const changeSelected = (id) => setSelected(id);
  return (
    <div className={styles.folders}>
      {array.map(({ _id, name }) => {
        return (
          <Folder
            key={_id}
            id={_id}
            selected={selected}
            changeSelected={changeSelected}
            changePage={changePage}
          >
            {trimName(name)}
          </Folder>
        );
      })}
    </div>
  );
}
