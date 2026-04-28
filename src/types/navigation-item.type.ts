import { type AppRoute } from "~/enums/app-route";
import { type IconName } from "./icon-name.type";

export type NavigationItem = {
  href: (typeof AppRoute)[keyof typeof AppRoute]; // TODO: make ValueOf type
  icon: IconName;
  label: string;
};
