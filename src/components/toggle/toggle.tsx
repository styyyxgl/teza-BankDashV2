import styles from "./styles.module.css";

interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label?: string;
  description?: string;
}

export const Toggle = ({ enabled, onChange, label, description }: ToggleProps) => {
  return (
    <div className={styles["toggle-container"]}>
      <div className={styles["toggle-header"]}>
        {label && <label className={styles["toggle-label"]}>{label}</label>}
        <button
          className={`${styles["toggle-switch"]} ${enabled ? styles["enabled"] : styles["disabled"]}`}
          onClick={() => onChange(!enabled)}
          role="switch"
          aria-checked={enabled}
          aria-label={label || "Toggle"}
        >
          <div className={styles["toggle-thumb"]} />
        </button>
      </div>
      {description && <p className={styles["toggle-description"]}>{description}</p>}
    </div>
  );
};
