import {
  collection,
  doc,
  getDocs,
  query,
  where,
  runTransaction,
  or,
} from "firebase/firestore";
import { db } from "~/config/firebase";
import type {
  Transaction,
  TransactionCategory,
} from "~/types/transaction.type";

type CreateTransactionDTO = {
  userId: string;
  fromCardId: string;
  toCardId: string;
  amount: number;
  category: TransactionCategory;
  description: string;
};

export const transactionService = {
  async createTransaction(data: CreateTransactionDTO): Promise<Transaction> {
    const cardsRef = collection(db, "cards");
    const transactionsRef = collection(db, "transactions");

    const receiverQuery = query(cardsRef, where("id", "==", data.toCardId));
    const receiverSnapshot = await getDocs(receiverQuery);

    if (receiverSnapshot.empty) {
      throw new Error("Recipient's card not found.");
    }

    const receiverDocRef = receiverSnapshot.docs[0].ref;
    const senderDocRef = doc(db, "cards", data.fromCardId);
    const newTransactionRef = doc(transactionsRef);

    let receiverUserId = "";
    let finalDescription = data.description.trim();

    await runTransaction(db, async (transaction) => {
      const senderCardSnap = await transaction.get(senderDocRef);
      if (!senderCardSnap.exists()) {
        throw new Error("Sender card not found.");
      }

      const senderBalance = senderCardSnap.data().balance;
      if (senderBalance < data.amount) {
        throw new Error("Insufficient funds.");
      }

      const receiverCardSnap = await transaction.get(receiverDocRef);
      if (!receiverCardSnap.exists()) {
        throw new Error("Recipient's card not found.");
      }

      const receiverBalance = receiverCardSnap.data().balance;
      receiverUserId = receiverCardSnap.data().userId;

      if (!finalDescription) {
        if (data.userId === receiverUserId) {
          finalDescription = "Internal transfer";
        } else {
          const receiverUserRef = doc(db, "users", receiverUserId);
          const receiverUserSnap = await transaction.get(receiverUserRef);

          if (receiverUserSnap.exists()) {
            const receiverName = receiverUserSnap.data().name || "Unknown";
            finalDescription = `Transfer to ${receiverName}`;
          } else {
            finalDescription = "Transfer";
          }
        }
      }

      transaction.update(senderDocRef, {
        balance: senderBalance - data.amount,
      });

      transaction.update(receiverDocRef, {
        balance: receiverBalance + data.amount,
      });

      const transactionData: Transaction = {
        id: newTransactionRef.id,
        ...data,
        description: finalDescription,
        receiverUserId,
        createdAt: Date.now(),
      };

      transaction.set(newTransactionRef, transactionData);
    });

    return {
      id: newTransactionRef.id,
      ...data,
      description: finalDescription,
      receiverUserId,
      createdAt: Date.now(),
    };
  },

  async getUserTransactions(userId: string): Promise<Transaction[]> {
    const transactionsRef = collection(db, "transactions");
    const q = query(
      transactionsRef,
      or(where("userId", "==", userId), where("receiverUserId", "==", userId)),
    );
    const snapshot = await getDocs(q);
    const transactions = snapshot.docs.map((doc) => doc.data() as Transaction);

    return transactions.sort((a, b) => b.createdAt - a.createdAt);
  },
};
