import { type PreviewItem } from "~/types/preview-item.type";

import Card from "~/assets/icons/Landing-Credit-Card.svg?react";
import Chart from "~/assets/icons/Landing-Chart.svg?react";
import Transactions from "~/assets/icons/Transactions.svg?react";

import dashboardImg from "~/assets/img/landing-dashboard.png";
import creditCardsImg from "~/assets/img/landing-creditcards.png";
import transactionsImg from "~/assets/img/landing-transactions.png";

export const PREVIEW_ITEMS: PreviewItem[] = [
  {
    id: "overview",
    title: "Overview",
    icon: Chart,
    imageSrc: dashboardImg,
  },
  {
    id: "cards",
    title: "Cards",
    icon: Card,
    imageSrc: creditCardsImg,
  },
  {
    id: "transactions",
    title: "Transactions",
    icon: Transactions,
    imageSrc: transactionsImg,
  },
];