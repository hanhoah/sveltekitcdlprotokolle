import { getBookDetails, getBooklinks } from './bookDetails.ts';

export async function load({ params }) {
	let slug = params.bookId;
	let { data } = await getBookDetails(slug);
	let bookid = data.id;
	console.log('bookid ist ', bookid);
	console.log('data in page.ts ist ', data);
	const links = await getBooklinks(bookid)

	// ähnliche Bücher holen
	// let similarBooks = await getBooksFromIds(booklist);

	return {
		data,links
	};
}
