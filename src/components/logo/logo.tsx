import { NavLink } from "react-router-dom";
import { AppRoute } from "~/enums/app-route";
import logo from "~/assets/img/bankdash-logo.svg";

import styles from "./styles.module.css";

export const Logo = () => {
  return (
    <div className={styles["logo"]}>
      <NavLink to={AppRoute.DASHBOARD}>
        <img src={logo} alt="BankDash" />
      </NavLink>
    </div>
  );
};
