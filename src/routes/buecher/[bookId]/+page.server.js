// Import der getBookDetails-Funktion aus der bookDetails-Datei
import { getBookDetails } from './bookDetails';
import { getSimilarBooks } from '$lib/functions/books.ts';
import { getHashtagIds, hashtagIdsToText } from '$lib/functions/getHashtags.ts';

export async function load({ params }) {
	const id = Number(params.bookId);

	// Buchdaten und Hashtags abrufen
	const { bookdata } = await getBookDetails(id);

	// Hashtags (abrufen)
	const hashtagIds = await getHashtagIds(id);

	// Hashtag IDs in Text umwandeln
	const hashtags = await hashtagIdsToText(hashtagIds);

	// ähnliche Bücher holen
	const similarBooks = await getSimilarBooks(hashtagIds);
	// console.log('similar books are: ', similarBooksIds);

	return {
		bookdata,
		hashtags,
		similarBooks
	};
}
