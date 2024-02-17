import { supabase } from '$lib/supabaseClient';

export async function getSimilarBooks(hashtagIds: number[]): Promise<any> {
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
		similarBooksIds = [...new Set(bookIds.map((row) => row.book_id))];
		console.log('Bücher mit den Hashtag-IDs:', similarBooksIds);
	}

	// 2. jetzt werden die Bücher zu den Ids ermittelt
	const { data: books, error: books_err } = await supabase
		.from('books')
		.select()
		.in('id', similarBooksIds);

	if (books_err) {
		console.error('Fehler beim Abrufen der Bücher aus der Id Liste:', books_err.message);
	} else {
		// Entferne Duplikate aus den Buch-IDs
		console.log('Bücher:', similarBooksIds);
	}

	return books;
}
