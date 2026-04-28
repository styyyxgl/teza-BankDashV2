import { useNavigate } from "react-router-dom";
import { AppRoute } from "~/enums/app-route";
import { CardsList } from "~/components/cards-list/cards-list";
import { RecentTransactions } from "~/components/recent-transactions/recent-transactions";
import { TransactionExpense } from "~/components/transaction-expense/transaction-expense";
import { NewTransfer } from "~/components/new-transfer/new-transfer";

import styles from "./styles.module.css";

export const MAX_CARDS_ON_TRANSACTIONS = 2;

export const Transactions = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.topGrid}>
        <div className={styles.cardsWrapper}>
          <CardsList
            onAddClick={() => navigate(AppRoute.CARDS)}
            limit={MAX_CARDS_ON_TRANSACTIONS}
          />
        </div>

        <div className={styles.expenseWrapper}>
          <TransactionExpense />
        </div>
      </div>

      <div className={styles.transferWrapper}>
        <NewTransfer />
      </div>

      <div className={styles.recentWrapper}>
        <RecentTransactions />
      </div>
    </div>
  );
};
