import supabase from '$lib/supabaseClient';
import { RESULTLIMIT } from '$lib/config';

interface Book {
	id: number;
	img: string;
	title: string;
}

export async function getBookIdsFromHashtagIds(hashtagIds: number[]): Promise<number[]> {
	// 1. zuerst werden die Ids ermittelt
	// console.log('Ähnliche Bücher aus IDs abrufen:', hashtagIds);
	let similarBooksIds: number[] = [];

	const { data: bookIds, error } = await supabase
		.from('books_hashtags')
		.select('book_id')
		.in('hashtag_id', hashtagIds);

	if (error) {
		// console.error('Fehler beim Abrufen der Buch-IDs:', error.message);
	} else {
		// Entferne Duplikate aus den Buch-IDs
		// console.log('bookIds', bookIds);
		similarBooksIds = [...new Set(bookIds.map((row) => row.book_id))];
		// console.log('Bücher mit den Hashtag-IDs:', similarBooksIds);
	}
	return similarBooksIds;
}

export async function getBookIdsFromCatId(catId: number): Promise<number[]> {
	let catBookIds: number[] = [];

	const { data: bookIds, error } = await supabase
		.from('books_categories')
		.select('book_id')
		.eq('category_id', catId);

	if (error) {
		console.log('Fehler beim Abrufen der BookIds(catId)');
	} else {
		console.log('Keine Fehler');
		catBookIds = [...new Set(bookIds.map((row) => row.book_id))];
	}
	return catBookIds;
}

export function getCategories(): object[] {
	const categories = [
		{ id: 1, name: 'Gesundheit' },
		{ id: 2, name: 'Krisenvorsorge' },
		{ id: 3, name: 'Medizinskandale' },
		{ id: 4, name: 'Tiergesundheit' }
	];

	return categories;
}

export async function getCategoryNameById(catId: number): Promise<string> {
	console.log('funktion call getCategoryNameById');
	const { data } = await supabase.from('categories').select('name').eq('id', catId);
	// console.log('data ', data);
	return data[0].name;
}

export async function getBook(id: number): Promise<Book>|null{
	const {data, error} = await supabase.from('books').select().eq('id', id).limit(1).single()
	if(error)
		return null;
	else{
		return data;
	}
}

export async function getBooksFromIds(ids: number[]): Promise<Book[] | null> {
	// 2. Jetzt werden die Bücher zu den IDs ermittelt
	const { data, error: books_err } = await supabase.from('books').select().in('id', ids);

	if (books_err) {
		// console.error('Fehler beim Abrufen der Bücher aus der ID-Liste:', books_err.message);
		return null;
	} else {
		// Entferne Duplikate aus den Buch-IDs
		// console.log('Bücher:', data);
		return data;
	}
}

export async function getBooksFromCategory(catid: number, limit:number=30): Promise<Book[] | null> {
	const { data, error } = await supabase.from('books_categories_view').select().eq('category_id', catid).order('prio').limit(limit);

	if (error) {
		// console.error('Fehler beim Abrufen der Bücher aus der ID-Liste:', books_err.message);
		return null;
	} else {
		return data;
	}
}

export async function getBookCategories(): Promise<string[] | null> {
	const { data, error: categories_err } = await supabase.from('categories').select();
	if (categories_err) {
		console.log('Fehler in der Abfrage');
		return null;
	} else {
		return data;
	}
}

export async function getCatId(bookid: number): Promise<number | null>{
	const {data, error} = await supabase.from('books_categories').select('category_id').eq('book_id', bookid).single();
	if(error)
		return null
	return data.category_id;

}