import { useEffect, useRef, useState } from "react";
import SettingsIcon from "~/assets/icons/Settings.svg?react";

import styles from "./styles.module.css";

const themes = ["blue", "dark", "gray"];

export const SettingsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("blue");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "blue";
    setTheme(savedTheme);
    document.documentElement.dataset.theme = savedTheme;
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

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

  return (
    <div className={styles["settings-menu"]} ref={dropdownRef}>
      <button
        className={styles["settings-button"]}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Settings"
      >
        <SettingsIcon />
      </button>

      {isOpen && (
        <div className={styles["dropdown"]}>
          <h3 className={styles["title"]}>Settings</h3>

          <div className={styles["themes"]}>
            {themes.map((item) => (
              <button
                key={item}
                type="button"
                className={`${styles["theme-button"]} ${styles[item]} ${
                  theme === item ? styles["active"] : ""
                }`}
                onClick={() => setTheme(item)}
                aria-label={`Change theme to ${item}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};