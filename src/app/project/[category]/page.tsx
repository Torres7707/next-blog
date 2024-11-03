export default function ProjectCategoryPage({
	params,
}: {
	params: { category: string };
}) {
	return <div>{params.category}</div>;
}
