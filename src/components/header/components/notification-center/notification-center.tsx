import { useNotifications } from "~/context/notification-context";
import styles from "./styles.module.css";

export const NotificationCenter = () => {
  const { notifications, removeNotification, markAsRead } = useNotifications();

  const handleOpen = () => {
    markAsRead();
  };

  return (
    <div className={styles["notification-center"]} onClick={handleOpen}>
      <div className={styles["notification-header"]}>
        <h3 className={styles["notification-title"]}>Notifications</h3>
        {notifications.length > 0 && (
          <button
            className={styles["clear-button"]}
            onClick={(e) => {
              e.stopPropagation();
              notifications.forEach((n) => removeNotification(n.id));
            }}
          >
            Clear all
          </button>
        )}
      </div>

      <div className={styles["notification-list"]}>
        {notifications.length === 0 ? (
          <div className={styles["empty-state"]}>
            <p>No notifications yet</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`${styles["notification-item"]} ${styles[`notification-${notification.type}`]}`}
            >
              <div className={styles["notification-content"]}>
                <p className={styles["notification-message"]}>
                  {notification.message}
                </p>
                <span className={styles["notification-time"]}>
                  {new Date(notification.timestamp).toLocaleTimeString(
                    "en-US",
                    { hour: "2-digit", minute: "2-digit" },
                  )}
                </span>
              </div>
              <button
                className={styles["close-button"]}
                onClick={() => removeNotification(notification.id)}
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
