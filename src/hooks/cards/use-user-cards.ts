import { useQuery } from "@tanstack/react-query";
import { cardService } from "~/services/card-service";
import { useAuth } from "~/context/auth-context";
import type { BankCard } from "~/types/bank-card.type";

export const useUserCards = () => {
  const { currentUser } = useAuth();

  return useQuery<BankCard[], Error>({
    queryKey: ["cards", currentUser?.uid],
    queryFn: () => cardService.getUserCards(currentUser!.uid),
    enabled: !!currentUser?.uid,
    staleTime: 5 * 60 * 1000,
  });
};
