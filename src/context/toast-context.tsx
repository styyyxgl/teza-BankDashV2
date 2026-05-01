import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { Toast, type ToastType } from "~/components/toast/toast";

type ToastContextType = {
  showToast: (message: string, type?: ToastType) => void;
};

type ToastItem = {
  id: number;
  message: string;
  type: ToastType;
};

const ToastContext = createContext<ToastContextType | null>(null);

let globalShowToast: ((message: string, type?: ToastType) => void) | null =
  null;

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
};

export const showGlobalToast = (
  message: string,
  type: ToastType = "info",
) => {
  globalShowToast?.(message, type);
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const showToast = (message: string, type: ToastType = "info") => {
    const id = Date.now();

    setToasts((prev) => {
      const newToasts = [...prev, { id, message, type }];

      return newToasts.slice(-2);
    });

    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  globalShowToast = showToast;

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toasts.map((toast, index) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          index={index}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </ToastContext.Provider>
  );
};