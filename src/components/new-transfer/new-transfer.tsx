import { useState } from "react";
import type { TransactionCategory } from "~/types/transaction.type";
import { useUserCards } from "~/hooks/cards/use-user-cards";
import { useCreateTransaction } from "~/hooks/transactions/use-create-transaction";

import styles from "./styles.module.css";

export const NewTransfer = () => {
  const { data: myCards = [] } = useUserCards();
  const { mutate, isPending } = useCreateTransaction();

  const [fromCardId, setFromCardId] = useState("");
  const [toCardId, setToCardId] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<TransactionCategory>("transfer");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const activeFromCardId =
    fromCardId || (myCards.length > 0 ? myCards[0].id : "");

  const handleTransactionSubmit = () => {
    setError("");

    if (!activeFromCardId) return setError("Please select your card.");

    if (!toCardId.trim() || toCardId.length < 16) {
      return setError(
        "Invalid receiver card number (must be at least 16 digits).",
      );
    }

    if (activeFromCardId === toCardId) {
      return setError("You cannot transfer to the same card.");
    }

    const numAmount = Number(amount);

    if (isNaN(numAmount) || numAmount <= 0) {
      return setError("Please enter a valid amount.");
    }

    if (numAmount < 0.01) {
      return setError("Minimum transfer amount is 0.01");
    }

    const amountParts = amount.split(".");

    if (amountParts.length > 1 && amountParts[1].length > 2) {
      return setError("Amount cannot have more than 2 decimal places.");
    }

    const selectedCard = myCards.find((card) => card.id === activeFromCardId);

    if (selectedCard && selectedCard.balance < numAmount) {
      return setError("Insufficient funds on the selected card.");
    }

    mutate(
      {
        fromCardId: activeFromCardId,
        toCardId,
        amount: numAmount,
        category,
        description,
      },
      {
        onSuccess: () => {
          setToCardId("");
          setAmount("");
          setDescription("");
        },
      },
    );
  };

  return (
    <section>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>New Transfer</h2>
      </div>

      <div className={styles.formGrid}>
        <select
          className={styles.input}
          value={activeFromCardId}
          onChange={(e) => setFromCardId(e.target.value)}
          disabled={myCards.length === 0}
        >
          {myCards.map((card) => (
            <option key={card.id} value={card.id}>
              {card.bank} - {card.id.slice(-4)} (${card.balance.toFixed(2)})
            </option>
          ))}
        </select>

        <input
          className={styles.input}
          type="text"
          value={toCardId}
          onChange={(e) => setToCardId(e.target.value)}
          placeholder="Receiver card number"
          maxLength={16}
        />

        <input
          className={styles.input}
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />

        <select
          className={styles.input}
          value={category}
          onChange={(e) => setCategory(e.target.value as TransactionCategory)}
        >
          <option value="transfer">Transfer</option>
          <option value="shopping">Shopping</option>
          <option value="subscription">Subscription</option>
          <option value="other">Other</option>
        </select>

        <input
          className={styles.input}
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <button
          className={styles.transferButton}
          onClick={handleTransactionSubmit}
          disabled={isPending || myCards.length === 0}
        >
          {isPending ? "Processing..." : "+ New Transfer"}
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}
    </section>
  );
};