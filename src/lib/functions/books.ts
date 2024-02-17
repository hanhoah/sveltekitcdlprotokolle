import { supabase } from '$lib/supabaseClient';

export async function getBookIdsFromHashtagIds(hashtagIds: number[]): Promise<number[]> {
	// 1. zuerst werden die Ids ermittelt
	console.log('Ähnliche Bücher aus IDs abrufen:', hashtagIds);
	let similarBooksIds: number[] = [];

	const { data: bookIds, error } = await supabase
		.from('books_hashtags')
		.select('book_id')
		.in('hashtag_id', hashtagIds);

	if (error) {
		console.error('Fehler beim Abrufen der Buch-IDs:', error.message);
	} else {
		// Entferne Duplikate aus den Buch-IDs
		console.log('bookIds', bookIds);
		similarBooksIds = [...new Set(bookIds.map((row) => row.book_id))];
		console.log('Bücher mit den Hashtag-IDs:', similarBooksIds);
	}
	return similarBooksIds;
}

export async function getBooksFromIds(ids: number[]): Promise<any[] | null> {
	// 2. Jetzt werden die Bücher zu den IDs ermittelt
	const { data, error: books_err } = await supabase.from('books').select().in('id', ids);

	if (books_err) {
		console.error('Fehler beim Abrufen der Bücher aus der ID-Liste:', books_err.message);
		return null;
	} else {
		// Entferne Duplikate aus den Buch-IDs
		console.log('Bücher:', data);
		return data;
	}
}
