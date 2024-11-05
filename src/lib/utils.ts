import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * @param inputs - The class names to merge
 * @returns The merged class names
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const fetchUrl =
	process.env.NODE_ENV === "development"
		? "http://localhost:3000/api"
		: "https://www.torres7707.wang/api";
