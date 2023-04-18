import React from "react";
import { FcFolder } from "react-icons/fc";

export default function Folder({
  id,
  selected,
  changeSelected,
  changePage,
  children,
}) {
  const setSelectedTrue = () => changeSelected(id);
  const setPage = () => changePage(id);
  console.log(selected);
  return (
    <div
      className={selected === id ? "folder folderSelected" : "folder"}
      onClick={setSelectedTrue}
      onDoubleClick={setPage}
    >
      <div>
        <FcFolder size={45} />
      </div>
      <p>{children}</p>
    </div>
  );
}
