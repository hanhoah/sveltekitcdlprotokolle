import { supabase } from '$lib/supabaseClient';

export async function getSimilarBooks(hashtagIds: number[]): Promise<number[]> {
	console.log('Ähnliche Bücher aus IDs abrufen:', hashtagIds);
	let similarBooks: number[] = [];

	const { data: bookIds, error } = await supabase
		.from('books_hashtags')
		.select('book_id')
		.in('hashtag_id', hashtagIds);

	if (error) {
		console.error('Fehler beim Abrufen der Buch-IDs:', error.message);
	} else {
		// Entferne Duplikate aus den Buch-IDs
		similarBooks = [...new Set(bookIds.map((row) => row.book_id))];
		console.log('Bücher mit den Hashtag-IDs:', similarBooks);
	}

	return similarBooks;
}
