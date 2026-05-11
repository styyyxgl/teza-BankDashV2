import { AppRoute } from "~/enums/app-route";
import { type NavigationItem } from "~/types/navigation-item.type";

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    href: AppRoute.DASHBOARD,
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    href: AppRoute.TRANSACTIONS,
    icon: "transactions",
    label: "Transactions",
  },
  {
    href: AppRoute.CARDS,
    icon: "card",
    label: "Credit Cards",
  },
  {
    href: AppRoute.INVESTMENTS,
    icon: "investments",
    label: "Investments",
  },
  {
    href: AppRoute.SETTINGS,
    icon: "settings",
    label: "Settings",
  },
];
