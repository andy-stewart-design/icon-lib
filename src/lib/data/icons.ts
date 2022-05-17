import lexicons from '$lib/data/lexicons.csv';
import { slugFromString } from '$lib/utils/slugFromPath';

export const iconIndex = lexicons.map(
	(d: { name: string; src: string; path: string; category: string; tags: string }) => ({
		name: d.name,
		src: slugFromString(d.name) + '.svg',
		path: d.path,
		category: d.category,
		tags: d.tags
	})
);

// export const iconIndex = () => {
// 	console.log(data);
// };
