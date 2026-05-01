import { Logo } from "~/components/logo/logo";
import { SearchBar } from "./components/search-bar/search-bar";
import { HeaderIconButton } from "./components/header-icon-button/header-icon-button";
import { UserMenu } from "./components/user-menu/user-menu";

import SettingsIcon from "~/assets/icons/Settings.svg?react";
import NotificationsIcon from "~/assets/icons/Notifications.svg?react";

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
          <HeaderIconButton icon={SettingsIcon} label="Settings" />
          <HeaderIconButton icon={NotificationsIcon} label="Notifications" />
          <UserMenu />
        </div>
      </div>
    </div>
  );
};