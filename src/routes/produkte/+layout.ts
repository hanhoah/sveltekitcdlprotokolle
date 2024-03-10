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

console.log('Produkt Layout wird initialisiert...');

export async function load() {
	const { count } = await supabase.from('products').select('*', { count: 'exact', head: true });
	const { data: categories } = await supabase.from('productcategories').select('*').order('name');
	return {
		count,
		categories
	};
}
