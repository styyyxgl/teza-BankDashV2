import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useAuth } from "~/context/auth-context";
import { transactionService } from "~/services/transaction-service";
import { cardService } from "~/services/card-service";

import styles from "./styles.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const WeeklyActivity = () => {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const [chartData, setChartData] = useState({
    incomes: [0, 0, 0, 0, 0, 0, 0],
    expenses: [0, 0, 0, 0, 0, 0, 0],
  });

  useEffect(() => {
    const fetchAndProcessTransactions = async () => {
      if (!currentUser?.uid) return;

      try {
        const [transactions, myCards] = await Promise.all([
          transactionService.getUserTransactions(currentUser.uid),
          cardService.getUserCards(currentUser.uid),
        ]);

        const myCardIds = myCards.map((card) => card.id);

        const weeklyIncomes = [0, 0, 0, 0, 0, 0, 0];
        const weeklyExpenses = [0, 0, 0, 0, 0, 0, 0];

        const now = new Date();
        const startOfWeek = new Date(now);
        const dayOfWeek =
          startOfWeek.getDay() === 0 ? 6 : startOfWeek.getDay() - 1;
        startOfWeek.setDate(now.getDate() - dayOfWeek);
        startOfWeek.setHours(0, 0, 0, 0);

        transactions.forEach((tx) => {
          const txDate = new Date(tx.createdAt);

          if (txDate >= startOfWeek) {
            const dayIndex = txDate.getDay() === 0 ? 6 : txDate.getDay() - 1;

            const isMySenderCard = tx.userId === currentUser.uid;
            const isMyReceiverCard = myCardIds.includes(tx.toCardId);

            if (isMySenderCard && isMyReceiverCard) {
              return;
            }

            if (isMySenderCard) {
              weeklyExpenses[dayIndex] += tx.amount;
            } else {
              weeklyIncomes[dayIndex] += tx.amount;
            }
          }
        });

        setChartData({
          incomes: weeklyIncomes,
          expenses: weeklyExpenses,
        });
      } catch (error) {
        console.error("Error loading chart data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndProcessTransactions();
  }, [currentUser?.uid]);

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: `Income ${chartData.incomes.reduce((sum, val) => sum + val, 0)}`,
        data: chartData.incomes,
        backgroundColor: "#16DBCC",
        borderRadius: 30,
        borderSkipped: false,
        maxBarThickness: 15,
        barPercentage: 0.7,
        categoryPercentage: 0.5,
      },
      {
        label: `Expense ${chartData.expenses.reduce((sum, val) => sum + val, 0)}`,
        data: chartData.expenses,
        backgroundColor: "#fe5c73ff",
        borderRadius: 30,
        borderSkipped: false,
        maxBarThickness: 15,
        barPercentage: 0.7,
        categoryPercentage: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        align: "end" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 8,
          boxHeight: 8,
          color: "#718EBF",
          font: { size: 14, family: "inherit" },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.datasetIndex === 0 ? "Income" : "Expense";

            return `${label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#718EBF" },
        border: { display: false },
      },
      y: {
        min: 0,
        ticks: { color: "#718EBF" },
        grid: { color: "#F3F3F5" },
        border: { display: false },
      },
    },
  };

  const hasData =
    chartData.incomes.some((amount) => amount > 0) ||
    chartData.expenses.some((amount) => amount > 0);

  return (
    <div className={styles["section"]}>
      <h2 className={styles["section-title"]}>Weekly Activity</h2>

      <div className={styles["panel"]}>
        {isLoading ? (
          <p>Loading graph...</p> // TODO: loader
        ) : !hasData ? (
          <div className={styles["description"]}>
            There were no transactions this week
          </div>
        ) : (
          <div className={styles["chart-wrapper"]}>
            <Bar data={data} options={options} />
          </div>
        )}
      </div>
    </div>
  );
};
