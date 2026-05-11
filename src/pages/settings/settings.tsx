import { useState, useEffect } from "react";
import { useAuth } from "~/context/auth-context";
import { profileService } from "~/services/profile-service";
import { Input } from "~/components/input/input";
import { useToast } from "~/context/toast-context";
import { COUNTRIES } from "~/constants/countries";
import { doc, getDoc } from "firebase/firestore";
import { db } from "~/config/firebase";

import styles from "./styles.module.css";

type Tab = "edit-profile" | "preferences" | "security";

export const Settings = () => {
  const { currentUser, userData } = useAuth();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<Tab>("edit-profile");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: userData?.name || "",
    username: userData?.username || "",
    email: userData?.email || "",
    dateOfBirth: userData?.dateOfBirth || "",
    city: userData?.city || "",
    country: userData?.country || "",
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        username: userData.username || "",
        email: userData.email || "",
        dateOfBirth: userData.dateOfBirth || "",
        city: userData.city || "",
        country: userData.country || "",
      });
    }
  }, [userData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    if (!currentUser) return;

    setLoading(true);
    try {
      await profileService.updateProfile(currentUser.uid, formData);
      
      const userDocRef = doc(db, "users", currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);
      
      if (userDocSnap.exists()) {
        const updatedData = userDocSnap.data();
        setFormData({
          name: updatedData.name || "",
          username: updatedData.username || "",
          email: updatedData.email || "",
          dateOfBirth: updatedData.dateOfBirth || "",
          city: updatedData.city || "",
          country: updatedData.country || "",
        });
      }
      
      showToast("Profile updated successfully!", "success");
    } catch (error) {
      showToast("Failed to update profile", "error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["settings-container"]}>
      <div className={styles["settings-header"]}>
        <h2 className={styles["settings-title"]}>Settings</h2>
      </div>

      <div className={styles["settings-tabs"]}>
        <button
          className={`${styles["tab-button"]} ${
            activeTab === "edit-profile" ? styles["active"] : ""
          }`}
          onClick={() => setActiveTab("edit-profile")}
        >
          Edit Profile
        </button>
        <button
          className={`${styles["tab-button"]} ${
            activeTab === "preferences" ? styles["active"] : ""
          }`}
          onClick={() => setActiveTab("preferences")}
        >
          Preferences
        </button>
        <button
          className={`${styles["tab-button"]} ${
            activeTab === "security" ? styles["active"] : ""
          }`}
          onClick={() => setActiveTab("security")}
        >
          Security
        </button>
      </div>

      <div className={styles["settings-content"]}>
        {activeTab === "edit-profile" && (
          <div className={styles["edit-profile"]}>
            <div className={styles["profile-header"]}>
              <div className={styles["profile-avatar"]}>
                <div className={styles["avatar-placeholder"]}>
                  {formData.name.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>

            <div className={styles["form-grid"]}>
              <div className={styles["form-column"]}>
                <Input
                  label="Your Name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={(value) => handleInputChange("name", value)}
                  placeholder="Enter your name"
                  disabled={true}
                />

                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(value) => handleInputChange("email", value)}
                  placeholder="Enter your email"
                  disabled={true}
                />

                <Input
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(value) => handleInputChange("dateOfBirth", value)}
                  placeholder="Select your birthday"
                />
              </div>

              <div className={styles["form-column"]}>
                <Input
                  label="User Name"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={(value) => handleInputChange("username", value)}
                  placeholder="Enter a username"
                />

                <Input
                  label="City"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={(value) => handleInputChange("city", value)}
                  placeholder="Enter city"
                />

                <Input
                  label="Country"
                  name="country"
                  type="select"
                  value={formData.country}
                  onChange={(value) => handleInputChange("country", value)}
                  placeholder="Select your country"
                  options={COUNTRIES}
                />
              </div>
            </div>

            <button
              className={styles["save-button"]}
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        )}

        {activeTab === "preferences" && (
          <div className={styles["preferences"]}>
            <h3>Preferences</h3>
            <p>Preferences section will be implemented in the future.</p>
          </div>
        )}

        {activeTab === "security" && (
          <div className={styles["security"]}>
            <h3>Security</h3>
            <p>Security section will be implemented in the future.</p>
          </div>
        )}
      </div>
    </div>
  );
};
