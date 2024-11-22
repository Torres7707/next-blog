import Container from "@/components/Container";
import Header from "@/components/Header";
import MainNav from "@/components/main-nav";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "About Me",
	description: "Information about me",
};

export default async function AboutPage() {
	return (
		<>
			<div className="bg-gray-100 dark:bg-gray-800">
				<Container>
					<MainNav />
					<Header>
						<h1 className="title font-semibold text-2xl tracking-tighter mt-4 capitalize">
							About Me
						</h1>
					</Header>
				</Container>
			</div>
			<div className="container max-w-6xl py-6 lg:py-10">
				<div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
					<div className="min-w-48 max-w-48 flex flex-col gap-2">
						<p className="text-muted-foreground text-center break-words text-xl font-bold text-gradient">
							✨ Front-end Developer✨
						</p>
					</div>
					<p className="text-muted-foreground text-lg py-4">
						🌍 Hi there! I'm Dong, also known as Torres. I love crafting
						beautiful and intuitive user experiences. 💡 Let's turn ideas into
						reality together! 📧 Reach out to me at:{" "}
						<a
							href="mailto:wangdong7707@gmail.com"
							className="text-blue-500 underline"
						>
							wangdong7707@gmail.com
						</a>
						.
					</p>
				</div>
			</div>
		</>
	);
}
