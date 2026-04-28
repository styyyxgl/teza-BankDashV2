import { NavLink } from "react-router-dom";
import { useCallback } from "react";
import { getValidClassNames } from "~/utils/get-valid-class-names";
import { type NavigationItem } from "~/types/navigation-item.type";
import { Icon } from "~/components/icon/icon";

import styles from "./styles.module.css";

type Properties = NavigationItem & {
  onClick?: () => void;
};

export const NavigationLink: React.FC<Properties> = ({
  href,
  label,
  icon,
  onClick,
}) => {
  const getClassName = useCallback(
    ({ isActive }: { isActive: boolean }): string => {
      return getValidClassNames(
        styles["navigation-link"],
        isActive && styles["active"],
      );
    },
    [],
  );

  return (
    <li className={styles["navigation-link-container"]}>
      <NavLink className={getClassName} onClick={onClick} to={href}>
        <>
          <Icon name={icon} className={styles["icon"]} />
          <span>{label}</span>
        </>
      </NavLink>
    </li>
  );
};
