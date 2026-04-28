import { type NavigationItem } from "~/types/navigation-item.type";
import { NavigationLink } from "./components/navigation-link/navigation-link";

import styles from "./styles.module.css";

type Properties = {
  items: NavigationItem[];
  onClick?: () => void;
};

export const Navigation: React.FC<Properties> = ({
  items,
  onClick,
}: Properties) => (
  <nav>
    <ul className={styles["navigation-list"]}>
      {items.map((item) => (
        <NavigationLink key={item.label} {...item} onClick={onClick} />
      ))}
    </ul>
  </nav>
);
