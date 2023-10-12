import { clsx } from "clsx"; // Keine Verwendung von TypeScript-Importen
import { twMerge } from "tailwind-merge";

// Verwenden Sie in JavaScript keine TypeScript-spezifischen Deklarationen
// Falls vorhanden, entfernen Sie alle 'type' Deklarationen

export function cn(...inputs) { // Entfernen Sie 'type ClassValue'
  return twMerge(clsx(inputs));
}
