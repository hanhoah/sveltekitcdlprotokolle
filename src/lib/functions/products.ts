import { supabase } from '$lib/supabaseClient';

interface Product {
	id: string;
	name: string;
	price: number;
	image: string;
	link: string;
	description: string;
}

export async function getProductsByCategoryId(catid: number): Promise<object[]> {
	console.log('getProductsByCategoryId');
	// console.log('neue verbesserte Funktion durch nutzung von Supabase Views');
	const { data, error } = await supabase
		.from('productswithcategory')
		.select('*')
		.eq('category_id', catid)
		.order('name');
	if (error) {
		console.log(
			'Fehler beim Abrufen von Produkten getProductsByCategoryId lib/functions/products.ts'
		);
	} else return data;
}

export async function getProductsByCategoryIdWithPagination(
	catid: number,
	page: number,
	pageSize: number
) {
	console.log('getProductsByCategoryIdWithPagination');
	console.log('page ist ', page);
	const offset = (page - 1) * pageSize; // Berechne den Offset basierend auf der aktuellen Seite
	const { data, error } = await supabase
		.from('productswithcategory')
		.select('*')
		.eq('category_id', catid)
		.order('name')
		.range(offset, offset + pageSize - 1); // range() Methode für Offset und Limit

	if (error) {
		console.error('Error fetching products:', error.message);
		return null;
	}

	return data;
}

export async function getProductIdsFromCatId(catId: number): Promise<string[]> {
	console.log('getProductIdsFromCatid, ', catId);
	let catProductIds: number[] = [];

	const { data: productIds, error } = await supabase
		.from('productscategoryview')
		.select('id')
		.eq('category_id', catId);

	if (error) {
		console.log('Fehler beim Abrufen der ProductIds(catId): ', error);
	} else {
		//das ergebnis ist ein Array of Objects und muss zu einem array of strings umgewandelt werden
		catProductIds = productIds.map((row) => row.id);
	}
	return catProductIds;
}

export function getCategories(): object[] {
	console.log('getCategories');
	const categories = [
		{ id: 5, name: 'Ayurveda' },
		{ id: 6, name: 'Aphrodisiaka' }
	];

	return categories;
}

export async function countProductsByCategory(cat: number): Promise<number | null> {
	console.log('countProductsByCategory');
	const { count } = await supabase
		.from('products_categories')
		.select('*', { count: 'exact', head: true })
		.eq('category_id', cat);

	return count;
}

export async function getCategoryNameById(catId: number): Promise<string> {
	console.log('getCategoryNameById');
	const { data } = await supabase.from('categories').select('name').eq('id', catId);
	return data[0].name;
}

export async function getProductsFromIds(ids: string[]): Promise<Book[] | null> {
	// 2. Jetzt werden die Produkte zu den IDs ermittelt
	const { data, error: products_err } = await supabase
		.from('products')
		.select()
		.in('id', ids)
		.order('name');

	if (products_err) {
		// console.error('Fehler beim Abrufen der Bücher aus der ID-Liste:', books_err.message);
		return null;
	} else {
		// Entferne Duplikate aus den Buch-IDs
		// console.log('Bücher:', data);
		return data;
	}
}

export async function getProductsFromIdsWithPagination(
	productIds: number[],
	page: number,
	pageSize: number
) {
	const offset = page - 1 + pageSize; // Berechne den Offset basierend auf der aktuellen Seite
	console.log('offset ist ', offset);
	console.log('page ist ', page);
	console.log('Pagesize ist ', pageSize);
	const { data, error } = await supabase
		.from('products')
		.select('*')
		.in('id', productIds)
		.order('name')
		.range(offset, offset + pageSize - 1); // range() Methode für Offset und Limit

	if (error) {
		console.error('Error fetching products:', error.message);
		return null;
	}

	return data;
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
