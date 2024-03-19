import { Badge } from 'flowbite-svelte';

export function getBadge(id) {
	let shopid = id.split('-')[0];
	// console.log('get badge from shopid ', shopid);
	let shop = '';
	let bgcolor = '';
	let textcolor = '';

	switch (shopid) {
		case 'gvk':
			shop = 'Kronenberg';
			bgcolor = 'bg-amber-500';
			break;
		case 'wk':
			shop = 'Waldkraft';
			bgcolor = 'bg-green-700';
			break;
		case 'cw':
			shop = 'Cellavita';
			bgcolor = 'bg-lime-500';
			break;
		case 'cv':
			shop = 'Cellavita';
			bgcolor = 'bg-lime-500';
			break;
		case 'be':
			shop = 'Bedrop';
			bgcolor = 'bg-orange-200';
			break;
		case 'ed':
			shop = 'Edubily';
			bgcolor = 'bg-amber-300';
			break;
		case 'hk':
			shop = 'Heilkraft';
			bgcolor = 'bg-red-400';
			break;
		default:
			shop = 'Unknown';
	}
	const badge =
		'<div class="border-2 absolute right-2 text-black rounded-md text-s p-1 text-center top-5 w-24 ' +
		bgcolor +
		' opacity-65" large color="green">' +
		shop +
		'</div>';

	// console.log('badge ', badge);

	return badge;
}
