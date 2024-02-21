import {
	getBookIdsFromCatId,
	getBooksFromIds,
	getBookCategories,
	getCategoryNameById
} from '$lib/functions/books.js';

export async function load({ params }) {
	const catid = params.catid;
	const bookIds = await getBookIdsFromCatId(parseInt(catid));
	const catname = await getCategoryNameById(parseInt(catid));
	const bookcategories = getBookCategories();

	const data = { catid, catname, bookcategories };
	return {
		data,
		streamed: {
			books: getBooksFromIds(bookIds)
		}
	};
}
