import Dashboard from "~/assets/icons/Dashboard.svg?react";
import Transactions from "~/assets/icons/Transactions.svg?react";
import CreditCard from "~/assets/icons/Credit-Card.svg?react";
import Investments from "~/assets/icons/Investments.svg?react";
import { type IconName } from "~/types/icon-name.type";

export const iconNameToSvg: Record<
  IconName,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  dashboard: Dashboard,
  transactions: Transactions,
  card: CreditCard,
  investments: Investments,
};
