import type { SelectOption } from "~/types/select-option.type";
import { CARD_TYPES_ARRAY } from "~/types/bank-card.type";
import { BANK_NAMES_ARRAY } from "~/types/bank-card.type";

export const CARD_TYPE_OPTIONS: SelectOption[] = CARD_TYPES_ARRAY.map(
  (cardType) => ({
    value: cardType,
    label: `${cardType} Card`,
  }),
);

export const BANK_OPTIONS: SelectOption[] = BANK_NAMES_ARRAY.map(
  (bankName) => ({
    value: bankName,
    label: bankName,
  }),
);
