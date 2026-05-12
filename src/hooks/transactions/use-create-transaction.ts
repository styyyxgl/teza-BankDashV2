import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionService } from "~/services/transaction-service";
import { useAuth } from "~/context/auth-context";
import { useToast } from "~/context/toast-context";
import { useNotifications } from "~/context/notification-context";
import type { TransactionCategory } from "~/types/transaction.type";

type CreateTransactionPayload = {
  fromCardId: string;
  toCardId: string;
  amount: number;
  category: TransactionCategory;
  description: string;
};

export const useCreateTransaction = () => {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { addNotification } = useNotifications();

  return useMutation({
    mutationFn: (data: CreateTransactionPayload) =>
      transactionService.createTransaction({
        userId: currentUser!.uid,
        fromCardId: data.fromCardId,
        toCardId: data.toCardId,
        amount: data.amount,
        category: data.category,
        description: data.description,
      }),

    onSuccess: (transaction) => {
      queryClient.invalidateQueries({
        queryKey: ["transactions", currentUser?.uid],
      });

      queryClient.invalidateQueries({
        queryKey: ["cards", currentUser?.uid],
      });

      showToast("Transaction successful!", "success");

      const notificationMessage =
        transaction.receiverUserId === currentUser?.uid
          ? `Internal transfer: $${transaction.amount.toFixed(2)} transferred`
          : `Transfer sent: $${transaction.amount.toFixed(2)} to ${transaction.description}`;

      addNotification(notificationMessage, "success");
    },

    onError: (err: any) => {
      showToast(
        err.message || "Failed to create transaction",
        "error"
      );
    },
  });
};
