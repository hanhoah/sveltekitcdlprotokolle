import supabase from '$lib/supabaseClient';

/*
const categories = [
	// { id: , name: 'Naturkosmetik' }, ==> id 15
	// { id: 40, name: 'Ozon' },
	// { id: 41, name: 'Parasiten' },
	// { id: 42, name: 'Schlaf' },
	// { id: 43, name: 'Stoffwechsel' },
	// { id: , name: 'Vitalpilze' }, ==> id 23
];
categories.sort((a, b) => a.name.localeCompare(b.name));
*/
let cachedCategories = null;

async function fetchCategories(){
	if(!cachedCategories){
		console.log('getting Categories from supabase');
		const { data: categories } = await supabase.from('productcategories').select('*').order('name');
		console.log('speichere Katgorien im Cache um zukünftige Anfragen zu beschleunigen');
		cachedCategories = categories
		return categories
	}
	console.log('Getting Categories from Cache');
	return cachedCategories;
}

console.log('Produkt Layout wird initialisiert...');

export async function load({setHeaders}) {
	setHeaders({
		"cache-control": "max-age=3600"
	})
	const { count } = await supabase.from('products').select('*', { count: 'exact', head: true });
	const categories = await fetchCategories()

	return {
		count,
		categories
	};
}
