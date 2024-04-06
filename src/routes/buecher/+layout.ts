const categories = [
	{ id: 1, name: 'Gesundheit' },
	{ id: 2, name: 'Krisenvorsorge' },
	{ id: 3, name: 'Medizinskandale' },
	{ id: 4, name: 'Tiergesundheit' }
];

export function load({setHeaders}) {
	setHeaders({
		"cache-control": "max-age=86400"
	})
	return {
		categories
	};
}
