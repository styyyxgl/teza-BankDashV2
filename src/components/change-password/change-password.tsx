import { useState } from "react";
import { useAuth } from "~/context/auth-context";
import { useToast } from "~/context/toast-context";
import { authService } from "~/services/auth-service";
import { authValidationRules } from "~/utils/auth-validation-rules";
import { Input } from "~/components/input/input";
import styles from "./styles.module.css";

type ValidationErrors = {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

export const ChangePassword = () => {
  const { currentUser } = useAuth();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
      isValid = false;
    }

    const passwordValidation = authValidationRules({
      password: formData.newPassword,
    });

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
      isValid = false;
    } else if (passwordValidation.errors.password) {
      newErrors.newPassword = passwordValidation.errors.password;
      isValid = false;
    } else if (formData.newPassword === formData.currentPassword) {
      newErrors.newPassword =
        "New password must be different from current password";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Password confirmation is required";
      isValid = false;
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field as keyof ValidationErrors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!currentUser) {
      showToast("User not authenticated", "error");
      return;
    }

    setLoading(true);
    try {
      await authService.changePassword(
        currentUser.email || "",
        formData.currentPassword,
        formData.newPassword,
      );

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      showToast("Password changed successfully!", "success");
    } catch (error: any) {
      console.error("Password change error:", error);

      if (error.code === "auth/wrong-password") {
        setErrors((prev) => ({
          ...prev,
          currentPassword: "Current password is incorrect",
        }));
        showToast("Current password is incorrect", "error");
      } else if (error.code === "auth/invalid-credential") {
        setErrors((prev) => ({
          ...prev,
          currentPassword: "Authentication failed",
        }));
        showToast("Authentication failed", "error");
      } else {
        showToast("Failed to change password", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["change-password-container"]}>
      <div className={styles["change-password-header"]}>
        <h3>Change Password</h3>
        <p>Update your password to keep your account secure</p>
      </div>

      <form onSubmit={handleSubmit} className={styles["change-password-form"]}>
        <Input
          label="Current Password"
          name="currentPassword"
          type="password"
          value={formData.currentPassword}
          onChange={(value) => handleInputChange("currentPassword", value)}
          placeholder="Enter your current password"
          error={errors.currentPassword}
          disabled={loading}
        />

        <Input
          label="New Password"
          name="newPassword"
          type="password"
          value={formData.newPassword}
          onChange={(value) => handleInputChange("newPassword", value)}
          placeholder="Enter your new password"
          error={errors.newPassword}
          disabled={loading}
        />

        <Input
          label="Confirm New Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={(value) => handleInputChange("confirmPassword", value)}
          placeholder="Confirm your new password"
          error={errors.confirmPassword}
          disabled={loading}
        />

        <button
          type="submit"
          className={styles["change-password-button"]}
          disabled={loading}
        >
          {loading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};
