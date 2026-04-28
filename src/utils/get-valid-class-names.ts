import { type ClassValue, clsx } from "clsx";

export const getValidClassNames = (...inputs: ClassValue[]): string => {
  return clsx(...inputs);
};
