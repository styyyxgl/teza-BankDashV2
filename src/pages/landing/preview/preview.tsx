import { useState } from "react";
import { PREVIEW_ITEMS } from "~/constants/preview-items";
import { getValidClassNames } from "~/utils/get-valid-class-names";

import styles from "./styles.module.css";

export const Preview = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const getCardPositionClass = (index: number) => {
    if (index === activeIndex) return styles["card-active"];
    if (index < activeIndex) return styles["card-left"];
    return styles["card-right"];
  };

  return (
    <div className={styles["preview"]}>
      <div className={styles["cards-list"]}>
        {PREVIEW_ITEMS.map((item, index) => (
          <div
            key={item.id}
            className={getValidClassNames(
              styles["card"],
              getCardPositionClass(index),
            )}
          >
            {item.imageSrc}
          </div>
        ))}
      </div>

      <div className={styles["timeline"]}>
        <div className={styles["timeline-line"]}></div>

        <div className={styles["timeline-buttons"]}>
          {PREVIEW_ITEMS.map((item, index) => {
            const isActive = index === activeIndex;
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className={getValidClassNames(
                  styles["button-container"],
                  isActive && styles["button-container-active"],
                )}
              >
                <div
                  className={styles["button"]}
                  onClick={() => setActiveIndex(index)}
                >
                  <Icon />
                </div>
                <p className={styles["button-title"]}>{item.title}</p>
              </div>
            );
          })}
        </div>

        <div className={styles["timeline-description"]}>
          Interactive Timeline
        </div>
      </div>
    </div>
  );
};
