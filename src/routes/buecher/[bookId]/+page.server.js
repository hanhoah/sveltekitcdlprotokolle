// Import der getBookDetails-Funktion aus der bookDetails-Datei
import { getBookDetails } from './bookDetails';
import { getBookIdsFromHashtagIds, getBooksFromIds } from '$lib/functions/books.ts';
import { getHashtagIds, hashtagIdsToText } from '$lib/functions/getHashtags.ts';
// export const prerender = false;

export async function load({ params }) {
	const id = Number(params.bookId);

	// Buchdaten und Hashtags abrufen
	const { bookdata } = await getBookDetails(id);

	// Hashtags (abrufen)
	const hashtagIds = await getHashtagIds(id);

	// Hashtag IDs in Text umwandeln
	const hashtags = await hashtagIdsToText(hashtagIds);

	// ähnliche Bücher holen
	const booklist = await getBookIdsFromHashtagIds(hashtagIds);
	const similarBooks = await getBooksFromIds(booklist);

	// console.log('similar books are: ', similarBooksIds);

	return {
		bookdata,
		hashtags,
		similarBooks
	};
}
