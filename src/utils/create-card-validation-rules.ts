export type CreateCardValidationData = {
  cardType?: string;
  bank?: string;
  name?: string;
};

export type CreateCardValidationErrors = Partial<
  Record<keyof CreateCardValidationData, string>
>;

export const createCardValidationRules = (data: CreateCardValidationData) => {
  const errors: CreateCardValidationErrors = {};
  let isValid = true;

  if (data.cardType !== undefined) {
    if (!data.cardType) {
      errors.cardType = "please select a card type";
      isValid = false;
    }
  }

  if (data.bank !== undefined) {
    if (!data.bank) {
      errors.bank = "please select a bank";
      isValid = false;
    }
  }

  if (data.name !== undefined) {
    if (!data.name.trim()) {
      errors.name = "name is required";
      isValid = false;
    } else if (data.name.length > 20) {
      errors.name = "name must be less than 20 characters";
      isValid = false;
    }
  }

  return { isValid, errors };
};
