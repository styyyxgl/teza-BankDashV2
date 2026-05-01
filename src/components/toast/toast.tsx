import styles from "./styles.module.css";

export type ToastType = "success" | "error" | "info";

type ToastProps = {
  message: string;
  type: ToastType;
  index: number;
  onClose: () => void;
};

export const Toast = ({ message, type, index, onClose }: ToastProps) => {
  return (
    <div
      className={`${styles.toast} ${styles[type]}`}
      style={{ top: `${24 + index * 64}px` }}
    >
      <span>{message}</span>

      <button onClick={onClose} className={styles.closeButton}>
        ×
      </button>
    </div>
  );
};