import { getBookDetails } from './bookDetails';
import { getBookIdsFromHashtagIds, getBooksFromIds } from '$lib/functions/books.ts';
import { getHashtagIds, hashtagIdsToText } from '$lib/functions/getHashtags.ts';

export async function load({ params }) {
	let buchid = parseInt(params.bookId);

	let { data } = await getBookDetails(buchid);

	// Hashtags (abrufen)
	let hashtagIds = await getHashtagIds(buchid);

	// Hashtag IDs in Text umwandeln
	let hashtags = await hashtagIdsToText(hashtagIds);

	// ähnliche Bücher holen
	let booklist = await getBookIdsFromHashtagIds(hashtagIds);
	let similarBooks = await getBooksFromIds(booklist);

	return {
		data,
		hashtags,
		similarBooks
	};
}
