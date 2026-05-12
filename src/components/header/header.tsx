import { Logo } from "~/components/logo/logo";
import { SearchBar } from "./components/search-bar/search-bar";
import { SettingsMenu } from "./components/settings-menu/settings-menu";
import { NotificationBell } from "./components/notification-bell/notification-bell";
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

        <div className={styles["header-actions"]}>
          <SearchBar />
          <SettingsMenu />
          <NotificationBell />
          <UserMenu />
        </div>
      </div>
    </div>
  );
};