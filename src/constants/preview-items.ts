import { type PreviewItem } from "~/types/preview-item.type";

import Card from "~/assets/icons/Landing-Credit-Card.svg?react";
import Chart from "~/assets/icons/Landing-Chart.svg?react";
import Loans from "~/assets/icons/Landing-Loans.svg?react";


export const PREVIEW_ITEMS: PreviewItem[] = [
  {
    id: "overview",
    title: "Overview",
    icon: Chart,
    imageSrc: "overviewImg", // TODO: add image
  },
  {
    id: "cards",
    title: "Cards",
    icon: Card,
    imageSrc: "cardsImg",
  },
  {
    id: "loans",
    title: "Loans",
    icon: Loans,
    imageSrc: "loansImg",
  },
];
