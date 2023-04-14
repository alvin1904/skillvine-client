"use client"
import React from "react";

export default function ErrorHandler(props) {
  return <div className={props.className}>{props.children}</div>;
}
