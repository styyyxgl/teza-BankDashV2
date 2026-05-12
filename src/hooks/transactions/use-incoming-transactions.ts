import { useEffect, useRef } from "react";
import { useAuth } from "~/context/auth-context";
import { useNotifications } from "~/context/notification-context";
import { transactionService } from "~/services/transaction-service";

export const useIncomingTransactions = () => {
  const { currentUser } = useAuth();
  const { addNotification } = useNotifications();
  const lastCheckRef = useRef(Date.now());

  useEffect(() => {
    if (!currentUser) return;

    const checkIncomingTransactions = async () => {
      try {
        const allTransactions =
          await transactionService.getUserTransactions(currentUser.uid);

        // Get only recent transactions (created after last check)
        const incomingTransactions = allTransactions.filter(
          (transaction) =>
            transaction.receiverUserId === currentUser.uid &&
            transaction.createdAt > lastCheckRef.current,
        );

        incomingTransactions.forEach((transaction) => {
          const message =
            transaction.receiverUserId === transaction.userId
              ? `Income: $${transaction.amount.toFixed(2)} received from ${transaction.description}`
              : `Transfer received: $${transaction.amount.toFixed(2)} from ${transaction.description}`;

          addNotification(message, "success");
        });

        lastCheckRef.current = Date.now();
      } catch (error) {
        console.error("Error checking incoming transactions:", error);
      }
    };

    // Check immediately and then every 30 seconds
    checkIncomingTransactions();
    const interval = setInterval(checkIncomingTransactions, 30000);

    return () => clearInterval(interval);
  }, [currentUser, addNotification]);
};
