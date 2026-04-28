import { Link } from "react-router-dom";
import { AppRoute } from "~/enums/app-route";
import { MAX_CARDS_PER_USER } from "~/constants/max-cards-per-user";
import { Card } from "./components/card/card";
import { useUserCards } from "~/hooks/cards/use-user-cards";
import Plus from "~/assets/icons/Plus.svg?react";

import styles from "./styles.module.css";

type Properties = {
  onAddClick: () => void;
  limit?: number;
};

export const CardsList: React.FC<Properties> = ({ limit, onAddClick }) => {
  const { data: cards = [], isLoading, isError } = useUserCards();

  const displayedCards = limit ? cards.slice(0, limit) : cards;
  const canAddNewCard = cards.length < MAX_CARDS_PER_USER;
  const hasSpaceForAddButton = limit ? displayedCards.length < limit : true;
  const showAddButton = canAddNewCard && hasSpaceForAddButton;

  if (isError) {
    return <div>Failed to load cards</div>;
  }

  return (
    <div className={styles["section"]}>
      <h2 className={styles["section-title"]}>
        My Cards
        {limit && cards.length > limit && (
          <Link to={AppRoute.CARDS} className={styles["section-subtitle"]}>
            See All
          </Link>
        )}
        {limit && cards.length === limit && canAddNewCard && (
          <Link to={AppRoute.CARDS} className={styles["section-subtitle"]}>
            Add Card
          </Link>
        )}
      </h2>

      <div className={styles["cards-grid"]}>
        {isLoading ? (
          <p>Loading cards...</p> // TODO: loader
        ) : (
          <>
            {displayedCards.map((card) => (
              <Card key={card.id} card={card} />
            ))}

            {showAddButton && (
              <div className={styles["empty-card"]} onClick={onAddClick}>
                <div className={styles["empty-card-icon"]}>
                  <Plus />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
