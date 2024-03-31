import { Badge } from 'flowbite-svelte';

export function getBadge(image) {
	const shopname = image.split('/')[1];
	let shop = '';
	let bgcolor = '';
	let textcolor = '';

	switch (shopname) {
		case 'kronenberg':
			shop = 'Kronenberg';
			bgcolor = 'bg-amber-500';
			break;
		case 'waldkraft':
			shop = 'Waldkraft';
			bgcolor = 'bg-green-700';
			break;
		case 'cellavita':
			shop = 'Cellavita';
			bgcolor = 'bg-lime-500';
			break;
		case 'bedrop':
			shop = 'Bedrop';
			bgcolor = 'bg-orange-200';
			break;
		case 'edubily':
			shop = 'Edubily';
			bgcolor = 'bg-amber-300';
			break;
		case 'heilkraft':
			shop = 'Heilkraft';
			bgcolor = 'bg-red-400';
			break;
		case 'kopp':
			shop = 'Kopp-Verlag';
			bgcolor = 'bg-red-600'
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
