import fs from "fs";
import path from "path";
import matter from "gray-matter";

// get all mdx files from the dir
/**
 * Get all MDX files from a directory
 * @param dir - The directory to get the MDX files from
 * @returns An array of MDX file paths
 */
function getMdxFiles(dir: string) {
	const files = fs.readdirSync(dir);
	return files.filter((file) => path.extname(file) === ".mdx");
}

// read data from those files
/**
 * Read the content of an MDX file
 * @param filePath - The path to the MDX file
 * @returns The content of the MDX file
 */
function readMdxFile(filePath: string) {
	const fileContent = fs.readFileSync(filePath, "utf8");
	return matter(fileContent);
}

// present the mdx data and metadata
/**
 * Get the MDX data from a directory
 * @param dir - The directory to get the MDX files from
 * @returns An array of MDX data
 */
function getMdxData(dir: string) {
	const mdxFiles = getMdxFiles(dir);
	return mdxFiles.map((file) => {
		const { data: metadata, content } = readMdxFile(path.join(dir, file));
		const slug = path.basename(file, path.extname(file));

		return {
			metadata,
			slug,
			content,
		};
	});
}

/**
 * Get the blog posts from the blog directory
 * @returns An array of blog posts
 */
export function getBlogPosts() {
	return getMdxData(path.join(process.cwd(), "src/app/blog/contents"));
}

/**
 * Format a date string to a human readable format
 * @param date - The date string to format
 * @param includeRelative - Whether to include the relative date
 * @returns The formatted date string
 */
export function formatDate(date: string, includeRelative = false) {
	const currentDate = new Date();
	if (!date.includes("T")) {
		date += "T00:00:00";
	}
	const targetDate = new Date(date);

	const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
	const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
	const daysAgo = currentDate.getDate() - targetDate.getDate();

	let formattedDate = "";
	if (yearsAgo > 0) {
		formattedDate = `${yearsAgo} year${yearsAgo > 1 ? "s" : ""} ago`;
	} else if (monthsAgo > 0) {
		formattedDate = `${monthsAgo} month${monthsAgo > 1 ? "s" : ""} ago`;
	} else if (daysAgo > 0) {
		formattedDate = `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
	} else {
		formattedDate = "today";
	}

	const fullDate = targetDate.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	if (includeRelative) {
		const relativeDate = new Intl.RelativeTimeFormat("en", {
			style: "narrow",
		}).format(
			Math.round((targetDate.getTime() - Date.now()) / 1000 / 60 / 60 / 24),
			"day"
		);
		return `${formattedDate} (${relativeDate})`;
	}

	return fullDate;
}
