import { Logo } from "~/components/logo/logo";
import { UserMenu } from "./components/user-menu/user-menu";

import styles from "./styles.module.css";

type Properties = {
  title: string;
};

export const Header: React.FC<Properties> = ({ title }: Properties) => {
  return (
    <div className={styles["header"]}>
      <Logo />

      <div className={styles["header-content"]}>
        <h1 className={styles["header-title"]}>{title}</h1>

        <UserMenu />
      </div>
    </div>
  );
};
