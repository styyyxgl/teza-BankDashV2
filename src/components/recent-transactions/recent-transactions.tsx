import { PDFDownloadLink } from "@react-pdf/renderer";
import { useState } from "react";
import { getValidClassNames } from "~/utils/get-valid-class-names";
import { TransactionReceiptPDF } from "./transaction-pdf/transaction-pdf";
import { useUserTransactions } from "~/hooks/transactions/use-user-transactions";
import { useUserCards } from "~/hooks/cards/use-user-cards";
import Income from "~/assets/icons/Income.svg?react";
import Expense from "~/assets/icons/Expense.svg?react";

import styles from "./styles.module.css";

const ITEMS_PER_PAGE = 5;

type TabType = "all" | "income" | "expense";
const TABS: { id: TabType; label: string }[] = [
  { id: "all", label: "All Transactions" },
  { id: "income", label: "Income" },
  { id: "expense", label: "Expense" },
];

export const RecentTransactions = () => {
  const { data: transactions = [], isLoading: isLoadingTx } =
    useUserTransactions();
  const { data: cards = [], isLoading: isLoadingCards } = useUserCards();
  const isLoading = isLoadingTx || isLoadingCards;
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [userSelectedCardId, setUserSelectedCardId] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  const activeCardId =
    userSelectedCardId || (cards.length > 0 ? cards[0].id : "");

  const handleTabChange = (tabId: TabType) => {
    setActiveTab(tabId);
    setCurrentPage(1);
  };

  const handleCardChange = (cardId: string) => {
    setUserSelectedCardId(cardId);
    setCurrentPage(1);
  };

  const filteredTransactions = transactions.filter((tx) => {
    if (!activeCardId) return false;

    const isExpense = tx.fromCardId === activeCardId;
    const isIncome = tx.toCardId === activeCardId;

    if (!isExpense && !isIncome) return false;
    if (activeTab === "income") return isIncome;
    if (activeTab === "expense") return isExpense;

    return true;
  });

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const safePage = Math.max(1, Math.min(currentPage, totalPages));
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;

  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const getPaginationItems = (current: number, total: number) => {
    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [1];
    if (current > 3) pages.push("...");

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (current < total - 2) pages.push("...");
    pages.push(total);

    return pages;
  };

  return (
    <div className={styles["section"]}>
      <h2 className={styles["section-title"]}>Recent Transactions</h2>

      <div className={styles["panel-container"]}>
        <div className={styles["panel-nav"]}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={getValidClassNames(
                styles["nav-button"],
                activeTab === tab.id && styles["nav-button-active"],
              )}
            >
              {tab.label}
            </button>
          ))}

          <div>
            <label>
              <select
                value={activeCardId}
                onChange={(e) => handleCardChange(e.target.value)}
                style={{ display: "block", width: "100%", padding: "8px" }}
                disabled={cards.length === 0}
              >
                {cards.map((card) => (
                  <option key={card.id} value={card.id}>
                    {card.name} (**** {card.id.slice(-4)})
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className={styles["panel"]}>
          <div
            className={getValidClassNames(
              styles["panel-info-grid"],
              styles["panel-info"],
            )}
          >
            <div className={styles["panel-info-item"]}>Description</div>
            <div className={styles["panel-info-item"]}>Sender</div>
            <div className={styles["panel-info-item"]}>Type</div>
            <div className={styles["panel-info-item"]}>Receiver</div>
            <div className={styles["panel-info-item"]}>Date</div>
            <div className={styles["panel-info-item"]}>Amount</div>
            <div className={styles["panel-info-item"]}>Receipt</div>
          </div>

          {isLoading ? (
            <p className={styles["loader"]}>Loading...</p> // TODO: loader
          ) : cards.length === 0 ? (
            <p className={styles["no-data"]}>
              No cards found. Please add a card to see transactions.
            </p>
          ) : filteredTransactions.length === 0 ? (
            <p className={styles["no-data"]}>
              No transactions found for this card.
            </p>
          ) : (
            paginatedTransactions.map((tx) => {
              const isIncome = tx.toCardId === activeCardId;
              const txType = isIncome ? "Income" : "Expense";

              return (
                <div key={tx.id} className={styles["panel-info-grid"]}>
                  <div
                    className={getValidClassNames(
                      styles["description"],
                      styles["panel-info-transaction-item"],
                    )}
                  >
                    {isIncome ? (
                      <Income className={styles["icon"]} />
                    ) : (
                      <Expense className={styles["icon"]} />
                    )}
                    <div className={styles["description-text"]}>
                      {tx.description}
                    </div>
                  </div>

                  <div className={styles["panel-info-transaction-item"]}>
                    **** {tx.fromCardId.slice(-4)}
                  </div>

                  <div
                    className={getValidClassNames(
                      styles["panel-info-transaction-item"],
                      isIncome ? styles["income"] : styles["expense"],
                    )}
                  >
                    {txType}
                  </div>

                  <div className={styles["panel-info-transaction-item"]}>
                    **** {tx.toCardId.slice(-4)}
                  </div>

                  <div className={styles["panel-info-transaction-item"]}>
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </div>

                  <div
                    className={getValidClassNames(
                      styles["panel-info-transaction-item"],
                      isIncome ? styles["income"] : styles["expense"],
                    )}
                  >
                    {isIncome ? "+" : "-"}${tx.amount.toFixed(2)}
                  </div>

                  <div className={styles["panel-info-transaction-item"]}>
                    <PDFDownloadLink
                      document={
                        <TransactionReceiptPDF
                          isIncome={isIncome}
                          transaction={tx}
                        />
                      }
                      fileName={`receipt_${tx.id}.pdf`}
                      className={styles["download-button"]}
                    >
                      Download
                    </PDFDownloadLink>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className={styles["panel-pagination"]}>
          {totalPages > 1 && (
            <>
              <button
                disabled={safePage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className={getValidClassNames(
                  styles["pagination-nav-button"],
                  safePage === 1 && styles["pagination-nav-button-disabled"],
                )}
              >
                &lt; Previous
              </button>

              <div className={styles["pagination-page-button-container"]}>
                {getPaginationItems(safePage, totalPages).map((item, index) => {
                  if (item === "...") {
                    return (
                      <span
                        key={`ellipsis-${index}`}
                        className={styles["dots"]}
                      >
                        ...
                      </span>
                    );
                  }

                  const pageNum = item as number;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={getValidClassNames(
                        styles["pagination-page-button"],
                        safePage === pageNum &&
                          styles["pagination-page-button-active"],
                      )}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                disabled={safePage === totalPages}
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                className={getValidClassNames(
                  styles["pagination-nav-button"],
                  safePage === totalPages &&
                    styles["pagination-nav-button-disabled"],
                )}
              >
                Next &gt;
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
