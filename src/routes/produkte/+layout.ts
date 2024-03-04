import { supabase } from '$lib/supabaseClient';

const categories = [
	{ id: 5, name: 'Ayurveda' },
	{ id: 6, name: 'Aphrodisiaka' },
	{ id: 7, name: 'Bestseller' },
	{ id: 8, name: 'Bioreiniger' },
	{ id: 9, name: 'Chlordioxid' },
	{ id: 10, name: 'Cordyceps' },
	{ id: 11, name: 'Darm Leber Niere' },
	{ id: 12, name: 'Innovationen' },
	{ id: 13, name: 'Extrakte' },
	{ id: 14, name: 'Haare' },
	{ id: 15, name: 'Kosmetik & Beauty' },
	{ id: 16, name: 'Kräuter' },
	{ id: 17, name: 'Nahrungs ergänzung' },
	{ id: 18, name: 'Öle' },
	{ id: 19, name: 'Schungit' },
	{ id: 20, name: 'Schwefel Kur' },
	{ id: 21, name: 'Tee, Kräuter, Pulver' },
	{ id: 22, name: 'Therapeuten infos' },
	{ id: 23, name: 'Vital Pilze' },
	{ id: 24, name: 'H2O2' },
	{ id: 25, name: 'Zubehör' },
	{ id: 26, name: 'Sensibilität' },
	{ id: 27, name: 'Energie' },
	{ id: 28, name: 'Gehirn' },
	{ id: 29, name: 'EM-Mikro organismen' }
	// { id: 30, name: 'Gute Laune' },
	// { id: 31, name: 'Herz' },
	// { id: 32, name: 'Immunsystem' },
	// { id: 33, name: 'Innere Ruhe' },
	// { id: 34, name: 'Knochen' },
	// { id: 35, name: 'Kolloide' },
	// { id: 36, name: 'Kräuter' },
	// { id: 37, name: 'Magen Darm' },
	// { id: 38, name: 'Mineralien' },
	// { id: 39, name: 'Mundhygiene' },
	// { id: , name: 'Naturkosmetik' }, ==> id 15
	// { id: 40, name: 'Ozon' },
	// { id: 41, name: 'Parasiten' },
	// { id: 42, name: 'Schlaf' },
	// { id: 43, name: 'Stoffwechsel' },
	// { id: , name: 'Vitalpilze' }, ==> id 23
];

categories.sort((a, b) => a.name.localeCompare(b.name));

export async function load() {
	const { data, count } = await supabase
		.from('products')
		.select('*', { count: 'exact', head: true });
	return {
		count,
		categories
	};
}
