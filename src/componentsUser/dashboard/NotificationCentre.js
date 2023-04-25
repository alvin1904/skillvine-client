import React, { useState } from "react";
import styles from "@/styles/student/Dashboard.module.css";
import Loadings from "@/components/Loading/Loadings";
import NothingFound from "@/components/Loading/NothingFound";
import EachNotification from "./EachNotification";
import NoNotifications from "./NoNotifications";

export default function NotificationCentre() {
  const [notifications, setNotifications] = useState([]);
  const loading = false;
  const clearNotifications = () => {
    setNotifications([]);
  };
  return (
    <>
      <div className={styles.notification__content}>
        {loading ? (
          <Loadings />
        ) : (
          notifications &&
          (notifications.length === 0 ? (
            <NoNotifications back={false} />
          ) : (
            notifications.map((notification, index) => (
              <EachNotification key={index}>{notification}</EachNotification>
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
