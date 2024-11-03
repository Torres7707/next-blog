import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import { highlight } from "sugar-high";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Blockquote(props: any) {
	return (
		<blockquote
			className="bg-blue-200 dark:bg-blue-950 dark:bg-opacity-30 bg-opacity-30 p-4 rounded-md blockquote"
			{...props}
		/>
	);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Code({ children, ...props }: any) {
	const codeHTML = highlight(children);

	return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomLink(props: any) {
	const href = props.href;

	if (href.startsWith("/")) {
		return (
			<Link href={href} {...props}>
				{props.children}
			</Link>
		);
	}

	if (href.startsWith("#")) {
		return <a {...props} />;
	}

	return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function RoundedImage(props: any) {
	return <Image alt={props.alt} className="rounded-lg" {...props} />;
}

function slugify(str: string) {
	return str
		.toString()
		.toLowerCase()
		.trim()
		.replace(/\s+/g, "-") // Replace spaces with -
		.replace(/&/g, "-and-") // Replace & with and
		.replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: number) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const Heading = ({ children }: any) => {
		const slug = slugify(children);

		return React.createElement(
			`h${level}`,
			{ id: slug },
			[
				React.createElement("a", {
					href: `#${slug}`,
					key: `link-${slug}`,
					className: "anchor",
				}),
			],
			children
		);
	};

	Heading.displayName = `Heading${level}`;
	return Heading;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Table({ data }: any) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const headers = data.headers.map((header: any, index: any) => (
		<th key={index}>{header}</th>
	));

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const rows = data.rows.map((cell: any, cellIndex: any) => (
		<td key={cellIndex}>{cell}</td>
	));

	return (
		<table>
			<thead>
				<tr>{headers}</tr>
			</thead>
			<tbody>{rows}</tbody>
		</table>
	);
}

function YouTube({ id }: { id: string }) {
	return (
		<div className="aspect-w-16 aspect-h-9 my-8">
			<iframe
				src={`https://www.youtube.com/embed/${id}`}
				allow="autoplay; encrypted-media"
				allowFullScreen
				className="rounded-lg"
			/>
		</div>
	);
}

const components = {
	h1: createHeading(1),
	h2: createHeading(2),
	h3: createHeading(3),
	h4: createHeading(4),
	h5: createHeading(5),
	h6: createHeading(6),
	Image: RoundedImage,
	a: CustomLink,
	code: Code,
	blockquote: Blockquote,
	Table,
	YouTube,
	// 自定义段落
	p: ({ children, ...props }: any) => (
		<p className="my-4 leading-7" {...props}>
			{children}
		</p>
	),

	// 自定义列表
	ul: ({ children, ...props }: any) => (
		<ul className="list-disc list-inside my-4" {...props}>
			{children}
		</ul>
	),

	// 自定义有序列表
	ol: ({ children, ...props }: any) => (
		<ol className="list-decimal list-inside my-4" {...props}>
			{children}
		</ol>
	),

	// 自定义强调
	em: ({ children, ...props }: any) => (
		<em className="italic text-gray-600" {...props}>
			{children}
		</em>
	),

	// 自定义加粗
	strong: ({ children, ...props }: any) => (
		<strong className="font-bold text-gray-900" {...props}>
			{children}
		</strong>
	),

	// 自定义分割线
	hr: (props: any) => <hr className="my-8 border-gray-200" {...props} />,

	// 自定义预格式化文本
	pre: ({ children, ...props }: any) => (
		<pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto" {...props}>
			{children}
		</pre>
	),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CustomMDX(props: any) {
	return (
		<MDXRemote
			{...props}
			components={{ ...components, ...(props.components || {}) }}
		/>
	);
}
