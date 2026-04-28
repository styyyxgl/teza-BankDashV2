export const CARD_TYPES_ARRAY = [
  "Credit",
  "Debit",
  "Virtual",
  "Prepaid",
] as const;
export const BANK_NAMES_ARRAY = [
  "NovaBank",
  "NeoBank",
  "TrustBank",
  "GlobalBank",
] as const;

export type CardType = (typeof CARD_TYPES_ARRAY)[number];
export type BankName = (typeof BANK_NAMES_ARRAY)[number];

export type Currency = "UAH" | "USD" | "EUR";

export interface BankCard {
  id: string;
  userId: string;
  name: string;
  balance: number;
  currency: Currency;
  cardType: CardType;
  bank: BankName;
  expirationDate: string;
  createdAt: number;
}
