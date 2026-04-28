import { useNavigate } from "react-router-dom";
import { AppRoute } from "~/enums/app-route";
import { CardsList } from "~/components/cards-list/cards-list";
import { Payments } from "~/components/payments/payments";
import { LastTransfers } from "~/components/last-transfers/last-transfers";
import { WeeklyActivity } from "~/components/weekly-activity/weekly-activity";

import styles from "./styles.module.css";

export const MAX_CARDS_ON_DASHBOARD = 2;

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className={styles["dashboard-grid"]}>
      <div className={styles["cards-wrapper"]}>
        <CardsList
          onAddClick={() => navigate(AppRoute.CARDS)}
          limit={MAX_CARDS_ON_DASHBOARD}
        />
      </div>

      <div className={styles["payments-wrapper"]}>
        <Payments />
      </div>

      <div className={styles["transfers-wrapper"]}>
        <LastTransfers />
      </div>

      <div className={styles["weekly-wrapper"]}>
        <WeeklyActivity />
      </div>

      <div className={styles["balance-wrapper"]}>
        {/* <Balance /> */}
        <div className={styles["placeholder"]}>Balance</div>
      </div>
    </div>
  );
};
