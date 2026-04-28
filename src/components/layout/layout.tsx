import { Outlet, useMatches } from "react-router-dom";

import { Header } from "~/components/header/header";
import { Sidebar } from "~/components/sidebar/sidebar";
import { Navigation } from "~/components/navigation/navigation";
import { NAVIGATION_ITEMS } from "~/constants/navigation-items";

import styles from "./styles.module.css";

export const Layout = () => {
  const matches = useMatches();

  const pageTitle =
    matches
      .map((match) => (match.handle as { title?: string })?.title)
      .reverse()
      .find(Boolean) || "Title";

  return (
    <div className={styles["layout"]}>
      <div className={styles["layout-header"]}>
        <Header title={pageTitle} />
      </div>

      <div className={styles["layout-sidebar"]}>
        <Sidebar>
          <Navigation items={NAVIGATION_ITEMS} />
        </Sidebar>
      </div>

      <main className={styles["layout-main"]}>
        <div className={styles["main-container"]}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
