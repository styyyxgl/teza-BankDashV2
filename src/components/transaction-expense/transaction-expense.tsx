import { useUserCards } from "~/hooks/cards/use-user-cards";
import { useUserTransactions } from "~/hooks/transactions/use-user-transactions";

import styles from "./styles.module.css";

export const TransactionExpense = () => {
  const { data: myCards = [] } = useUserCards();
  const { data: transactions = [] } = useUserTransactions();

  const getLast6Months = () => {
    const result: string[] = [];
    const date = new Date();

    for (let i = 5; i >= 0; i--) {
      const d = new Date(date.getFullYear(), date.getMonth() - i, 1);
      result.push(d.toLocaleString("en-US", { month: "short" }));
    }

    return result;
  };

  const monthLabels = getLast6Months();

  const expensesByMonth = monthLabels.map((month) => ({
    month,
    total: 0,
  }));

  transactions.forEach((tx) => {
    const isExpense = myCards.some((card) => card.id === tx.fromCardId);

    if (!isExpense) return;

    const txMonth = new Date(tx.createdAt).toLocaleString("en-US", {
      month: "short",
    });

    const monthItem = expensesByMonth.find((item) => item.month === txMonth);

    if (monthItem) {
      monthItem.total += tx.amount;
    }
  });

  const maxExpense = Math.max(...expensesByMonth.map((item) => item.total), 1);

  const expenseData = expensesByMonth.map((item) => ({
    month: item.month,
    total: item.total,
    height: item.total > 0 ? Math.max((item.total / maxExpense) * 126, 22) : 44,
  }));

  const totalExpense = expensesByMonth.reduce(
    (sum, item) => sum + item.total,
    0,
  );

  const activeExpenseMonth = expenseData.reduce((max, item) =>
    item.total > max.total ? item : max,
  );

  return (
    <section>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>My Expense</h2>
      </div>

      <div className={styles.expenseCard}>
        <span className={styles.expenseValue}>
          ${totalExpense.toLocaleString("en-US")}
        </span>

        {expenseData.map((item) => (
          <div key={item.month} className={styles.barItem}>
            <div
              className={`${styles.bar} ${
                item.total > 0 ? styles.activeBar : ""
              }`}
              style={{ height: `${item.height}px` }}
              title={`$${item.total.toFixed(2)}`}
            />

            <span className={styles.month}>{item.month}</span>
          </div>
        ))}
      </div>
    </section>
  );
};