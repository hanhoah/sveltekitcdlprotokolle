import { supabase } from '$lib/supabaseClient';

interface Product {
	id: string;
	name: string;
	price: number;
	image: string;
	link: string;
	description: string;
}

export async function getProductIdsFromCatId(catId: number): Promise<string[]> {
	console.log('getProductIdsFromCatid, ', catId);
	let catProductIds: number[] = [];

	const { data: productIds, error } = await supabase
		.from('products_categories')
		.select('product_id')
		.eq('category_id', catId);

	if (error) {
		console.log('Fehler beim Abrufen der ProductIds(catId)');
	} else {
		console.log('Keine Fehler');
		catProductIds = [...new Set(productIds.map((row) => row.product_id))];
		console.log('catProductIds ', catProductIds);
	}
	return catProductIds;
}

export function getCategories(): object[] {
	const categories = [
		{ id: 5, name: 'Ayurveda' },
		{ id: 6, name: 'Aphrodisiaka' }
	];

	return categories;
}

export async function getCategoryNameById(catId: number): Promise<string> {
	console.log('funktion call getCategoryNameById');
	const { data } = await supabase.from('categories').select('name').eq('id', catId);
	console.log('data ', data);
	return data[0].name;
}

export async function getProductsFromIds(ids: string[]): Promise<Book[] | null> {
	// 2. Jetzt werden die Produkte zu den IDs ermittelt
	const { data, error: products_err } = await supabase.from('products').select().in('id', ids);

	if (products_err) {
		// console.error('Fehler beim Abrufen der Bücher aus der ID-Liste:', books_err.message);
		return null;
	} else {
		// Entferne Duplikate aus den Buch-IDs
		// console.log('Bücher:', data);
		return data;
	}
}

export async function getProductCategories(): Promise<string[] | null> {
	const { data, error: categories_err } = await supabase.from('categories').select();
	if (categories_err) {
		console.log('Fehler in der Abfrage');
		return null;
	} else {
		return data;
	}
}
