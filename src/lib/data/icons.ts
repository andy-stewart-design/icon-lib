import type { Icons } from '$lib/types/icons';
import lexicons from '$lib/data/lexicons.csv';
import { slugFromString } from '$lib/utils/slugFromPath';

const iconIndex: Icons[] = lexicons.map((d: Icons) => ({
	name: d.name,
	src: slugFromString(d.name) + '.svg',
	path: d.path,
	category: d.category,
	tags: d.tags
}));

let categoriesUnique = new Set<string>();
for (const icon of iconIndex) {
	categoriesUnique.add(icon.category);
}
const categories: string[] = Array.from(categoriesUnique);
categories.unshift('All Categories');

export { iconIndex, categories };
