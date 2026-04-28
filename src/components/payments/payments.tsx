import { Link } from "react-router-dom";
import { AppRoute } from "~/enums/app-route";
import { getValidClassNames } from "~/utils/get-valid-class-names";
import Send from "~/assets/icons/Payments-Send-Money.svg?react";
import Invest from "~/assets/icons/Payments-Invest.svg?react";

import styles from "./styles.module.css";

export const Payments = () => {
  return (
    <div className={styles["section"]}>
      <h2 className={styles["section-title"]}>Payments</h2>

      <div className={styles["panel"]}>
        <div className={styles["description"]}>
          Initiate secure transfers, withdrawals, or investments from your
          account.
        </div>
        <Link to={AppRoute.TRANSACTIONS} className={styles["button"]}>
          <div
            className={getValidClassNames(styles["icon"], styles["icon-send"])}
          >
            <Send />
          </div>
          Send Money
        </Link>

        <Link to={AppRoute.INVESTMENTS} className={styles["button"]}>
          <div
            className={getValidClassNames(
              styles["icon"],
              styles["icon-invest"],
            )}
          >
            <Invest />
          </div>
          Invest
        </Link>
      </div>
    </div>
  );
};
