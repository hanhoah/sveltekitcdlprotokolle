export function getBadge(image) {
    if (!image) {
        console.log('Fehler: image ist undefined oder leer');
        return ''; // Rückgabe eines leeren Strings oder einer anderen Standardausgabe
    }

	// console.log('images ist ', image);
	let shopname = ""
	try {
		shopname = image.split('/')[1];
		// console.log('shopname ist ', shopname);
	} catch (error) {
		console.log('error in image.split ', error);		
	}
	let shop = '';
	let bgcolor = '';
	let textcolor = '';

	switch (shopname) {
		case 'bio-apo':
			shop = 'bio-apo';
			bgcolor = 'bg-green-500';
			textcolor = 'text-white'
			break;
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
