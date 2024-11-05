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

type ResponseData = {
	category: string;
	slug: string;
	title: string;
};

export const fetcher = (
	...args: Parameters<typeof fetch>
): Promise<ResponseData[]> => fetch(...args).then((res) => res.json());
