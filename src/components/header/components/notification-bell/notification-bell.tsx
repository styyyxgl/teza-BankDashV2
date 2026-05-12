import { useState } from "react";
import { useNotifications } from "~/context/notification-context";
import { NotificationCenter } from "../notification-center/notification-center";
import NotificationsIcon from "~/assets/icons/Notifications.svg?react";

import styles from "./notification-bell.module.css";

export const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { hasUnread, markAsRead } = useNotifications();

  const toggleNotifications = () => {
    const newOpenState = !isOpen;
    setIsOpen(newOpenState);

    if (newOpenState) {
      markAsRead();
    }
  };

  const handleClickOutside = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles["notification-bell-container"]}>
      <button
        className={styles["bell-button"]}
        onClick={toggleNotifications}
        aria-label="Notifications"
        type="button"
      >
        <NotificationsIcon />
        {hasUnread && <div className={styles["notification-badge"]} />}
      </button>

      {isOpen && (
        <>
          <div
            className={styles["notification-overlay"]}
            onClick={handleClickOutside}
          />
          <NotificationCenter />
        </>
      )}
    </div>
  );
};
