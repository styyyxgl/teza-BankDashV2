export type TransactionCategory =
  | "transfer"
  | "shopping"
  | "subscription"
  | "other";

export type Transaction = {
  id: string;
  userId: string;
  receiverUserId: string;
  fromCardId: string;
  toCardId: string;
  amount: number;
  category: TransactionCategory;
  description: string;
  createdAt: number;
};
