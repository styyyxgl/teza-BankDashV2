import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionService } from "~/services/transaction-service";
import { useAuth } from "~/context/auth-context";
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

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions", currentUser?.uid],
      });
      queryClient.invalidateQueries({
        queryKey: ["cards", currentUser?.uid],
      });

      alert("Transaction successful!"); // TODO: toast
    },
    onError: (err: any) => {
      alert(err.message || "Failed to create transaction"); // TODO: toast
    },
  });
};
