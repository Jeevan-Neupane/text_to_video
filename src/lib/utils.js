import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString) {
  const date = new Date(dateString);

  const options = {day: "numeric", month: "short", year: "numeric"};

  return date.toLocaleDateString("en-GB", options);
}