import { doc, updateDoc } from "firebase/firestore";
import { db } from "~/config/firebase";
import type { UserProfile } from "~/types/user-profile.type";

export const profileService = {
  async updateProfile(userId: string, profileData: Partial<UserProfile>) {
    try {
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, {
        ...profileData,
        updatedAt: Date.now(),
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  },
};
