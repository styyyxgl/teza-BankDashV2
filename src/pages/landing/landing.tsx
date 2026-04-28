import { Link } from "react-router-dom";
import { AppRoute } from "~/enums/app-route";
import { Preview } from "./preview/preview";

import styles from "./styles.module.css";

export const Landing = () => {
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["header"]}>
        <div className={styles["title"]}>BankDash.</div>
        <div className={styles["auth"]}>
          <Link to={AppRoute.SIGN_IN} className={styles["auth-link"]}>
            Sign In
          </Link>
          <Link to={AppRoute.SIGN_UP} className={styles["auth-link"]}>
            Sign Up
          </Link>
        </div>
      </div>

      <div className={styles["content"]}>
        <div className={styles["description"]}>
          <h1 className={styles["heading"]}>
            Unlock Your Ultimate
            <br />
            Financial Command.
          </h1>
          <p className={styles["subheading"]}>
            The unified platform for transactions, cards,
            <br />
            and loans — all in one crystal clear control panel.
          </p>
          <Link to={AppRoute.SIGN_UP} className={styles["cta-button"]}>
            Get Started
          </Link>
        </div>

        <Preview />
      </div>
    </div>
  );
};
