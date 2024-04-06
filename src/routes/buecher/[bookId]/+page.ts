import { getBooksFromCategory, getCatId } from '$lib/functions/books.ts';
import { getBookDetails, getBooklinks } from './bookDetails.ts';

export async function load({ params, setHeaders }) {
	let slug = params.bookId;

	setHeaders({
		"cache-control": "max-age=86400"
	})
	let { data } = await getBookDetails(slug);
	let bookid = data.id;
	// console.log('bookid ist ', bookid);
	// console.log('data in page.ts ist ', data);
	const links = await getBooklinks(bookid)

	// ähnliche Bücher holen
	// 1. Kategorie ermitteln
	const catid = await getCatId(bookid);
	console.log('cat id ist ', catid);
	// 2. Bücher aus der Kategorie holen
	let similarBooks = await getBooksFromCategory(catid, 12)
	console.log('similarBooks ist ', similarBooks);
	// 3. Ergebnis rendern

	return {
		data,links, similarBooks
	};
}
