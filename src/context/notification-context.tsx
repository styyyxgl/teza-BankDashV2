import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export type NotificationType = "success" | "error" | "info";

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  timestamp: number;
}

type NotificationContextType = {
  notifications: Notification[];
  addNotification: (message: string, type: NotificationType) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  hasUnread: boolean;
  markAsRead: () => void;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
};

const NotificationContext = createContext<NotificationContextType | null>(null);
const STORAGE_KEY = "app_notifications";
const UNREAD_KEY = "app_notifications_unread";
const NOTIFICATIONS_ENABLED_KEY = "app_notifications_enabled";

export const useNotifications = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotifications must be used within NotificationProvider",
    );
  }

  return context;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [hasUnread, setHasUnread] = useState(() => {
    try {
      const stored = localStorage.getItem(UNREAD_KEY);
      return stored ? JSON.parse(stored) : false;
    } catch {
      return false;
    }
  });

  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    try {
      const stored = localStorage.getItem(NOTIFICATIONS_ENABLED_KEY);
      return stored ? JSON.parse(stored) : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (notificationsEnabled) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [notifications, notificationsEnabled]);

  useEffect(() => {
    localStorage.setItem(UNREAD_KEY, JSON.stringify(hasUnread));
  }, [hasUnread]);

  useEffect(() => {
    localStorage.setItem(NOTIFICATIONS_ENABLED_KEY, JSON.stringify(notificationsEnabled));
    if (!notificationsEnabled) {
      setNotifications([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [notificationsEnabled]);

  const addNotification = (message: string, type: NotificationType) => {
    if (!notificationsEnabled) {
      return;
    }

    const id = `${Date.now()}-${Math.random()}`;
    const newNotification: Notification = {
      id,
      message,
      type,
      timestamp: Date.now(),
    };

    setNotifications((prev) => [newNotification, ...prev]);
    setHasUnread(true);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const markAsRead = () => {
    setHasUnread(false);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        clearNotifications,
        hasUnread,
        markAsRead,
        notificationsEnabled,
        setNotificationsEnabled,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
