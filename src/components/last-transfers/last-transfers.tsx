import { useMemo } from "react";
import { useAuth } from "~/context/auth-context";
import { useUserTransactions } from "~/hooks/transactions/use-user-transactions";
import { useUserCards } from "~/hooks/cards/use-user-cards";
import { getValidClassNames } from "~/utils/get-valid-class-names";
import Income from "~/assets/icons/Income.svg?react";
import Expense from "~/assets/icons/Expense.svg?react";

import styles from "./styles.module.css";

const MAX_TRANSFERS_TO_SHOW = 4;

export const LastTransfers = () => {
  const { currentUser } = useAuth();
  const { data: transactions = [], isLoading: isLoadingTx } =
    useUserTransactions();
  const { data: myCards = [], isLoading: isLoadingCards } = useUserCards();
  const isLoading = isLoadingTx || isLoadingCards;
  const uid = currentUser?.uid;

  const transfers = useMemo(() => {
    if (!uid) return [];

    const externalTransfers = transactions.filter((tx) => {
      const isMySenderCard = tx.userId === uid;
      const isMyReceiverCard = myCards.some((card) => card.id === tx.toCardId);

      return isMySenderCard !== isMyReceiverCard;
    });

    return externalTransfers.slice(0, MAX_TRANSFERS_TO_SHOW);
  }, [transactions, myCards, uid]);

  return (
    <div className={styles["section"]}>
      <h2 className={styles["section-title"]}>Last Transfers</h2>

      <div className={styles["panel"]}>
        {isLoading ? (
          <p className={styles["loader"]}>Loading...</p> // TODO: loader
        ) : transfers.length === 0 ? (
          <p className={styles["no-data"]}>No transfers yet</p>
        ) : (
          <>
            <div className={styles["header"]}>
              <div>Description</div>
              <div>Amount</div>
              <div>Date</div>
            </div>

            <div className={styles["transactions"]}>
              {transfers.map((tx) => {
                const isIncome = tx.userId !== currentUser?.uid;
                const formattedDate = new Date(tx.createdAt).toLocaleDateString(
                  "en-US",
                  {
                    day: "numeric",
                    month: "short",
                  },
                );

                return (
                  <div key={tx.id} className={styles["transaction-row"]}>
                    <div className={styles["description"]}>
                      {isIncome ? (
                        <Income className={styles["icon"]} />
                      ) : (
                        <Expense className={styles["icon"]} />
                      )}
                      <span className={styles["description-text"]}>
                        {tx.description}
                      </span>
                    </div>

                    <div
                      className={getValidClassNames(
                        styles["amount"],
                        isIncome ? styles["income"] : styles["expense"],
                      )}
                    >
                      {isIncome ? "+" : "-"}${tx.amount.toFixed(2)}
                    </div>

                    <div className={styles["date"]}>{formattedDate}</div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
