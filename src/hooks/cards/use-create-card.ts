import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cardService } from "~/services/card-service";
import { useAuth } from "~/context/auth-context";
import { useToast } from "~/context/toast-context";
import type { CardType, BankName } from "~/types/bank-card.type";

type CreateCardPayload = {
  name: string;
  cardType: CardType;
  bank: BankName;
};

export const useCreateCard = () => {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: (data: CreateCardPayload) =>
      cardService.createCard(
        currentUser!.uid,
        data.name,
        data.cardType,
        data.bank,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cards", currentUser?.uid],
      });
      showToast("Card added successfully!", "success");
    },
    onError: (err: any) => {
      showToast(err.message || "Failed to create card", "error");
    },
  });
};
