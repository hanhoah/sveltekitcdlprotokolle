import { Badge } from 'flowbite-svelte';

export function getBadge(id) {
	let shopid = id.split('-')[0];
	let shop = '';
	let color = '';

	switch (shopid) {
		case 'gvk':
			shop = 'Kronenberg';
			color = 'bg-amber-500';
			break;
		case 'wk':
			shop = 'Waldkraft';
			color = 'bg-green-700';
			break;
		default:
			shop = 'Unknown';
	}
	const badge =
		'<div class="border-2 absolute right-2 text-white rounded-md text-s p-1 text-center top-5 w-24 ' +
		color +
		' opacity-65" large color="green">' +
		shop +
		'</div>';

	// console.log('badge ', badge);

	return badge;
}
