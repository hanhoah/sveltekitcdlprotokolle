import { getSimilarBooks } from '$lib/functions/books';
import { getHashtagIds, hashtagIdsToText } from '$lib/functions/getHashtags';
import { supabase } from '$lib/supabaseClient';

export async function getBookDetails(bookId) {
	try {
		// Buchdaten abrufen
		const { data } = await supabase.from('books').select('*').eq('id', bookId).limit(1).single();

		// Hashtags (abrufen)
		const hashtagIds = await getHashtagIds(bookId);

		// Hashtag IDs in Text umwandeln
		const hashtags = await hashtagIdsToText(hashtagIds);

		// ähnliche Bücher holen
		const similarBooksIds = await getSimilarBooks(hashtagIds);
		// console.log('similar books are: ', similarBooksIds);

		// Die Buchdaten und die dazugehörigen Hashtags zurückgeben
		return { bookdata: data, hashtags, similarBooksIds };
	} catch (error) {
		console.error(error);
		return { bookdata: null, hashtags: [] };
	}
}
