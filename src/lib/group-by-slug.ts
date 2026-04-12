export const groupBySlug = (rows: any[]): Record<string, any[]> => {
	const grouped: Record<string, any[]> = {};
	for (const row of rows) {
		const slug = row.tags.slug;
		const items = grouped[slug] ?? [];
		items.push(row.vocabulary);
		grouped[slug] = items;
	}
	return grouped;
};
