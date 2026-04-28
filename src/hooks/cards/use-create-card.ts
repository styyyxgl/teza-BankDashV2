import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cardService } from "~/services/card-service";
import { useAuth } from "~/context/auth-context";
import type { CardType, BankName } from "~/types/bank-card.type";

type CreateCardPayload = {
  name: string;
  cardType: CardType;
  bank: BankName;
};

export const useCreateCard = () => {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();

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
      alert("Card added successfully!"); // TODO: toast
    },
    onError: (err: any) => {
      alert(err.message || "Failed to create card"); // TODO: toast
    },
  });
};
