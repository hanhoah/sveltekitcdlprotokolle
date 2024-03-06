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

	//SEO
	const title = catname + ' Bücher | cdl-protokolle.com';
	// Erstelle die Meta-Beschreibung basierend auf der Kategoriebeschreibung oder einem Standardtext
	const metaDescription = `Entdecken Sie eine Vielzahl von Büchern auf cdl-protokolle.com`;

	const data = { catid, catname, bookcategories, title, metaDescription };
	return {
		data,
		streamed: {
			books: getBooksFromIds(bookIds)
		}
	};
}
