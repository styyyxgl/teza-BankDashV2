export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  username?: string;
  dateOfBirth?: string;
  city?: string;
  country?: string;
  createdAt: number;
  updatedAt?: number;
}
