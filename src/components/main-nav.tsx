"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Icons } from "./icon";
import { ModeToggle } from "./ui/mode-toggle";
import { POSTS } from "@/lib/constants";

export default function MainNav({ className }: { className?: string }) {
	return (
		<div
			className={cn(
				"flex flex-col items-start justify-start md:flex-row md:items-center md:justify-between pt-10 z-50",
				className
			)}
		>
			<Link href="/">
				<div className="flex items-center gap-2">
					<Icons.logo className="h-16 w-16" />
					<p className="text-2xl font-bold">Torres7707</p>
				</div>
			</Link>
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuTrigger>Posts</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
								{POSTS.map((post) => (
									<ListItem
										key={post.title}
										title={post.title}
										href={post.href}
									>
										{post.description}
									</ListItem>
								))}
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<Link href="/projects" legacyBehavior passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								Projects
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<Link href="/about" legacyBehavior passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								About
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>

			<div className="flex items-center justify-between w-20">
				<ModeToggle />
				<Link href="/rss">
					<Icons.rss className="h-6 w-6" />
				</Link>
			</div>
		</div>
	);
}

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";
