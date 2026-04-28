import { useQuery } from "@tanstack/react-query";
import { transactionService } from "~/services/transaction-service";
import { useAuth } from "~/context/auth-context";
import type { Transaction } from "~/types/transaction.type";

export const useUserTransactions = () => {
  const { currentUser } = useAuth();

  return useQuery<Transaction[], Error>({
    queryKey: ["transactions", currentUser?.uid],
    queryFn: () => transactionService.getUserTransactions(currentUser!.uid),
    enabled: !!currentUser?.uid,
    staleTime: 5 * 60 * 1000,
  });
};
