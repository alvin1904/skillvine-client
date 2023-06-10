import React from "react";

export default function Loadings({ color }) {
  if (color && typeof color !== "string") color = "var(--clr-primary-300)";
  return (
    <div className="loader_occupier">
      <span className="loader" style={{ border: `3px solid ${color}` }}></span>
    </div>
  );
}
