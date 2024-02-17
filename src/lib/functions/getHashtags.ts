import { supabase } from '$lib/supabaseClient';

export async function getHashtagIds(bookId: number) {
	// Hashtags für das Buch abrufen
	const { data: hashtagsData, error } = await supabase
		.from('books_hashtags')
		.select('hashtag_id')
		.eq('book_id', bookId);

	if (error) {
		throw new Error('Fehler beim Abrufen der Hashtags: ' + error.message);
	}

	// Extrahiere die Hashtag-IDs aus dem Ergebnis
	const hashtagIds = hashtagsData.map((row) => row.hashtag_id);

	return hashtagIds;
}

export async function hashtagIdsToText(hashtagIds: number[]) {
	// Abfrage, um die Hashtags als Klartext zu erhalten
	const { data: hashtags, error: hashtagError } = await supabase
		.from('hashtags')
		.select('tag')
		.in('id', hashtagIds);

	if (hashtagError) {
		throw new Error('Fehler beim Abrufen der Hashtags: ' + hashtagError.message);
	}

	return hashtags;
}
