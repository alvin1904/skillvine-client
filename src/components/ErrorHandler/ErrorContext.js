"use client";
import React, { useContext, useEffect, useState } from "react";
import ErrorHandler from "./ErrorHandler";
import {
  MdAssignmentTurnedIn,
  MdError,
  MdWarning,
  MdInfo,
} from "react-icons/md";

// CONFIGURATIONS
const status = {
  ERROR: "error",
  SUCCESS: "success",
  WARNING: "warning",
  INFO: "info",
};

const themes = {
  DARK: "dark",
  LIGHT: "light",
};

const defaults = {
  show: false,
  status: status.ERROR,
  themes: themes.DARK,
  message: "We ran into some problem. Sorry for the inconvinience",
  timeout: 3000,
};

const icons = {
  error: MdError,
  success: MdAssignmentTurnedIn,
  warning: MdWarning,
  info: MdInfo,
};

const errorMessages = {
  400: "Check your input and try again.",
  401: "Log in to access this content",
  403: "You do not have permission to access this content",
  404: "Not Found",
  405: "This page does not support the method you are using",
  500: "Our servers are overloaded or down. Sorry!",
};
// TRANSLATE STATUS CODE TO MESSAGE
const translate = (code) => errorMessages[code] || defaults.message;

const ErrorContext = React.createContext();

const CustomError = ({ children }) => {
  const defaultClassName =
    "error_handler_1904 hide1904 error1904border dark1904";

  // STATES
  const [className, setClassName] = useState(defaultClassName);
  const [err, setErr] = useState(defaults.message);
  const [type, setType] = useState();

  // THROW ERROR
  const throwError = (
    message = defaults.message,
    status = defaults.status,
    themes = defaults.themes
  ) => {
    setErr(typeof message === "number" ? translate(message) : message);
    setType(status);
    setClassName(
      `error_handler_1904 show1904 ${status ? status : ""}1904border ${
        themes ? themes : ""
      }1904`
    );
  };

  // TIMER
  useEffect(() => {
    const timeout = setTimeout(
      () => setClassName(defaultClassName),
      defaults.timeout || 3000
    );
    return () => clearTimeout(timeout);
  }, [className]);

  return (
    <ErrorContext.Provider value={{ throwError }}>
      <ErrorHandler className={className}>
        <div className="error_img_1904">
          {type && icons[type]({ size: 25, className: `${type}1904` })}
        </div>
        <div>{err}</div>
      </ErrorHandler>
      {children}
    </ErrorContext.Provider>
  );
};

const useCustomError = () => useContext(ErrorContext);

export { useCustomError, CustomError, status, themes };
