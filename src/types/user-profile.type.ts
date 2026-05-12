import type { Currency } from "./bank-card.type";

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  username?: string;
  dateOfBirth?: string;
  city?: string;
  country?: string;
  currency?: Currency;
  createdAt: number;
  updatedAt?: number;
}
