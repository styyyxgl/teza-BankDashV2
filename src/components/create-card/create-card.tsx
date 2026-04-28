import { useState } from "react";
import { Input } from "~/components/input/input";
import {
  CARD_TYPE_OPTIONS,
  BANK_OPTIONS,
} from "~/constants/create-card-options";
import type { CardType, BankName } from "~/types/bank-card.type";
import { createCardValidationRules } from "~/utils/create-card-validation-rules";
import { useCreateCard } from "~/hooks/cards/use-create-card";

import styles from "./styles.module.css";

type Properties = {
  sectionRef?: React.Ref<HTMLDivElement>;
};

export const CreateCard: React.FC<Properties> = ({ sectionRef }) => {
  const { mutate, isPending } = useCreateCard();
  const [cardType, setCardType] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [bank, setBank] = useState<string>("");
  const [errors, setErrors] = useState({ cardType: "", bank: "", name: "" });

  const handleCreateCard = () => {
    const { isValid, errors: validationErrors } = createCardValidationRules({
      cardType,
      bank,
      name,
    });

    if (!isValid) {
      setErrors({
        cardType: validationErrors.cardType || "",
        bank: validationErrors.bank || "",
        name: validationErrors.name || "",
      });
      return;
    }

    mutate(
      {
        name: name.trim(),
        cardType: cardType as CardType,
        bank: bank as BankName,
      },
      {
        onSuccess: () => {
          setCardType("");
          setBank("");
          setName("");
        },
      },
    );
  };

  return (
    <div ref={sectionRef} className={styles["section"]}>
      <h2 className={styles["section-title"]}>Add New Card</h2>

      <div className={styles["panel"]}>
        <div className={styles["description"]}>
          Credit Card generally means a plastic card issued by Scheduled
          Commercial Banks
          <br />
          assigned to a Cardholder, with a credit limit, that can be used to
          purchase goods
          <br />
          and services on credit or obtain cash advances.
        </div>

        <div className={styles["fields-grid"]}>
          <Input
            label="Card Type"
            type="select"
            name="card-type"
            placeholder="Choose card type"
            value={cardType}
            onChange={(val) => {
              setCardType(val);
              if (errors.cardType)
                setErrors((prev) => ({ ...prev, cardType: "" }));
            }}
            options={CARD_TYPE_OPTIONS}
            error={errors.cardType}
          />

          <Input
            label="Bank"
            type="select"
            name="bank"
            placeholder="Choose bank"
            value={bank}
            onChange={(val) => {
              setBank(val);
              if (errors.bank) setErrors((prev) => ({ ...prev, bank: "" }));
            }}
            options={BANK_OPTIONS}
            error={errors.bank}
          />

          <Input
            label="Name On Card"
            name="name"
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(val) => {
              setName(val);
              if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
            }}
            error={errors.name}
          />
        </div>

        <button
          className={`${styles["button"]} ${isPending ? styles["loading"] : ""}`}
          onClick={handleCreateCard}
          disabled={isPending}
        >
          {isPending ? "Adding..." : "Add Card"}
        </button>
      </div>
    </div>
  );
};
