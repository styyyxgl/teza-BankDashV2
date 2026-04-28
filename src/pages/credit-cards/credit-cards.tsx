import { useRef } from "react";
import { CreateCard } from "~/components/create-card/create-card";
import { CardsList } from "~/components/cards-list/cards-list";

import styles from "./styles.module.css";

export const CreditCards = () => {
  const createCardSectionRef = useRef<HTMLDivElement>(null);

  const scrollToCreateCard = () => {
    createCardSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className={styles["page-container"]}>
      <CardsList onAddClick={scrollToCreateCard} />

      <CreateCard sectionRef={createCardSectionRef} />
    </div>
  );
};
