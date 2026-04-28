import { useState, useRef, useEffect } from "react";
import { getValidClassNames } from "~/utils/get-valid-class-names";
import type { SelectOption } from "~/types/select-option.type";

import styles from "./styles.module.css";

type Properties = {
  label?: string;
  name: string;
  type?: "text" | "password" | "email" | "number" | "select";
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  options?: SelectOption[];
  error?: string;
};

export const Input: React.FC<Properties> = ({
  label = "label",
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  options = [],
  error,
}) => {
  const isSelect = type === "select";

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isSelect) return;

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
  }, [isSelect]);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleOptionClick = (optionValue: string | number) => {
    onChange(String(optionValue));
    setIsOpen(false);
  };

  return (
    <div className={styles["input-wrapper"]}>
      <label htmlFor={name} className={styles["label"]}>
        {label}
      </label>

      {isSelect ? (
        <div className={styles["select-container"]} ref={dropdownRef}>
          <div
            className={getValidClassNames(
              styles["field"],
              styles["select-trigger"],
              isOpen && styles["select-trigger-active"],
              error && styles["field-error"],
            )}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span>
              {selectedOption
                ? selectedOption.label
                : placeholder || "Choose an option"}
            </span>
          </div>

          {isOpen && (
            <div className={styles["options-list"]}>
              {options.map((option) => (
                <div
                  key={option.value}
                  className={getValidClassNames(
                    styles["option"],
                    option.value === value && styles["option-selected"],
                  )}
                  onClick={() => handleOptionClick(option.value)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          className={getValidClassNames(
            styles["field"],
            error && styles["field-error"],
          )}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}

      {error && <span className={styles["error-text"]}>{error}</span>}
    </div>
  );
};
