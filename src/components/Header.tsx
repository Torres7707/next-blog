export default function Header({ children }: { children: React.ReactNode }) {
	return (
		<header className="bg-gray-100 p-8 dark:bg-gray-800">{children}</header>
	);
}
