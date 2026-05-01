import type { ComponentType, SVGProps } from "react";

import styles from "./styles.module.css";

type Properties = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
};

export const HeaderIconButton: React.FC<Properties> = ({
  icon: Icon,
  label,
}) => {
  return (
    <button className={styles["icon-button"]} type="button" aria-label={label}>
      <Icon />
    </button>
  );
};