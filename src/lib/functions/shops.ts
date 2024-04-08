import { Badge } from 'flowbite-svelte';

export function getBadge(image) {
	console.log('images ist ', image);
	const shopname = image.split('/')[1];
	console.log('shopname ist ', shopname);
	let shop = '';
	let bgcolor = '';
	let textcolor = '';

	switch (shopname) {
		case 'kronenberg':
			shop = 'Kronenberg';
			bgcolor = 'bg-amber-500';
			textcolor = 'text-black'
			break;
		case 'waldkraft':
			shop = 'Waldkraft';
			bgcolor = 'bg-green-700';
			textcolor = 'text-white'
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
			textcolor = 'text-white'

			break;
		default:
			shop = 'Unknown';
	}
	const badge =`<div class="border-2 absolute right-2 rounded-md text-s p-1 text-center top-5 w-24 ${bgcolor} opacity-85 ${textcolor}">
	${shop} 
</div>`;

	// console.log('badge ', badge);

	return badge;
}
