import { useState, useRef, useEffect } from "react";
import { useAuth } from "~/context/auth-context";
import { authService } from "~/services/auth-service";
import defaultPhoto from "~/assets/img/default-avatar.jpg";

import styles from "./styles.module.css";

export const UserMenu = () => {
  const { userData } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error); // TODO: handle error
    }
  };

  const name = userData?.name || "Name";
  const email = userData?.email || "example@gmail.com";
  const photoUrl = /* TODO: userData?.avatarUrl || */ defaultPhoto;

  return (
    <div className={styles["user-menu"]} ref={dropdownRef}>
      <button
        className={styles["avatar-button"]}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <img src={photoUrl} alt={name} className={styles["avatar-image"]} />
      </button>

      {isOpen && (
        <div className={styles["dropdown-menu"]}>
          <div className={styles["dropdown-header"]}>
            <img
              src={photoUrl}
              alt={name}
              className={styles["dropdown-avatar-large"]}
            />
            <div className={styles["dropdown-user-info"]}>
              <span className={styles["dropdown-name"]}>{name}</span>
              <span className={styles["dropdown-email"]}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    d="m7 9l3.75 3a2 2 0 0 0 2.5 0L17 9m4 8V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2"
                  />
                </svg>
                {email}
              </span>
            </div>
          </div>

          <hr className={styles["dropdown-hr"]} />

          <div className={styles["dropdown-footer"]}>
            <button className={styles["logout-button"]} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
