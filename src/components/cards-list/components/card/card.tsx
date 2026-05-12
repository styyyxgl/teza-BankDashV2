import type { BankCard } from "~/types/bank-card.type";
import { getValidClassNames } from "~/utils/get-valid-class-names";
import CardChip from "~/assets/icons/Card-Chip.svg?react";
import CardChip2 from "~/assets/icons/Chip-Card-2.svg?react";
import Copy from "~/assets/icons/Card-Number-Copy.svg?react";
import { useToast } from "~/context/toast-context";

import styles from "./styles.module.css";

type Properties = {
  card: BankCard;
};

export const Card: React.FC<Properties> = ({ card }) => {
  const { showToast } = useToast();
  const copyToClipboard = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      showToast("Card number copied", "success");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div
      className={getValidClassNames(
        styles["card"],
        styles[card.cardType.toLowerCase()],
      )}
    >
      <div className={styles["header"]}>
        <div className={styles["bank-name"]}>{card.bank}</div>
        <div className={styles["card-type"]}>{card.cardType} Card</div>
      </div>

      <div className={styles["balance-section"]}>
        <div className={styles["balance"]}>
          <span>{card.balance.toLocaleString("en-US")}</span>
          <span className={styles["currency"]}>{card.currency}</span>
        </div>
        {card.cardType === "Virtual" ? <CardChip /> : <CardChip2 />}
      </div>

      <div className={styles["details"]}>
        <div>
          <span className={styles["detail-label"]}>Card Holder</span>
          <div>{card.name}</div>
        </div>
        <div>
          <span className={styles["detail-label"]}>Expires</span>
          <div>{card.expirationDate}</div>
        </div>
      </div>

      <div
        className={styles["card-number-container"]}
        onClick={() => copyToClipboard(card.id)}
      >
        {card.id.match(/.{1,4}/g)?.join(" ")}
        <Copy className={styles["copy-icon"]} />
      </div>
    </div>
  );
};
