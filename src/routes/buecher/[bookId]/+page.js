import { getBookDetails, getBooklinks } from './bookDetails.ts';
import { getBookIdsFromHashtagIds, getBooksFromIds } from '$lib/functions/books.ts';
import { getHashtagIds, hashtagIdsToText } from '$lib/functions/getHashtags.ts';

export async function load({ params }) {
	let buchid = parseInt(params.bookId);

	let { data } = await getBookDetails(buchid);

	// Hashtags (abrufen)
	let hashtagIds = await getHashtagIds(buchid);

	// ähnliche Bücher holen
	let booklist = await getBookIdsFromHashtagIds(hashtagIds);
	// let similarBooks = await getBooksFromIds(booklist);

	return {
		data,
		streamed: {
			links: getBooklinks(buchid),
			similarBooks: getBooksFromIds(booklist),
			hashtags: hashtagIdsToText(hashtagIds)
		}
	};
}
