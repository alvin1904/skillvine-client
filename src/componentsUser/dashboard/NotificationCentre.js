import React, { useEffect, useState } from "react";
import styles from "@/styles/student/Dashboard.module.css";
import Loadings from "@/components/Loading/Loadings";
import EachNotification from "./EachNotification";
import NoNotifications from "./NoNotifications";
import useAxiosCaller from "@/utils/useAxiosCaller";
import { deleteNotificationsAPI, getNotificationsAPI } from "@/apis";
import { status, useCustomError } from "@/components/ErrorHandler/ErrorContext";

export default function NotificationCentre() {
  const [notifications, setNotifications] = useState([]);

  const { throwError } = useCustomError();
  const { loading, fetchData } = useAxiosCaller();
  useEffect(() => {
    const getNotification = async () => {
      const response = await fetchData(getNotificationsAPI);
      if ([200, 304].includes(response.status) && response.data)
        setNotifications(response.data);
      else if (response?.response?.status === 401)
        console.log("Token not present");
      else throwError(response.status);
    };
    getNotification();
  }, []);

  const clearNotifications = async () => {
    if (notifications.length === 0)
      return throwError("No notifications to clear!", status.INFO);
    const response = await fetchData(deleteNotificationsAPI);
    if ([200, 304].includes(response.status) && response.data) {
      setNotifications([]);
      throwError(
        `${response.data?.notification?.deletedCount} Notification(s) deleted`,
        status.INFO
      );
    } else if (response.status === 401) console.log("Token not present");
    else throwError(response.status);
  };
  return (
    <>
      <div className={styles.notification__content}>
        {loading ? (
          <Loadings color="var(--clr-primary-200)" />
        ) : (
          notifications &&
          (notifications.length === 0 ? (
            <NoNotifications />
          ) : (
            notifications.map((notification, index) => (
              <EachNotification key={index}>
                {notification?.message}
              </EachNotification>
            ))
          ))
        )}
      </div>
      <div className={styles.notification__footer}>
        <button
          className={styles.notification__footer__button}
          onClick={clearNotifications}
        >
          Clear All
        </button>
      </div>
    </>
  );
}
