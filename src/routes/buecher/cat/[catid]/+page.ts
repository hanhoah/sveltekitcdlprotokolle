import { getBookIdsFromCatId, getBooksFromIds, getBookCategories } from '$lib/functions/books.js';

export async function load({ params }) {
	const bookIds = await getBookIdsFromCatId(parseInt(params.catid));
	const data = {};
	return {
		streamed: {
			data,
			books: getBooksFromIds(bookIds),
			bookcategories: getBookCategories()
		}
	};
}
