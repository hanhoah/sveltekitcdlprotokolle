import {
	getBooksFromCategory,
	getBookCategories,
	getCategoryNameById
} from '$lib/functions/books.js';

import { getCategoryDescription } from '$lib/functions/categories.js';

export async function load({ params }) {
	const catid = params.catid;
	const catname = await getCategoryNameById(parseInt(catid));
	
	const bookcategories = getBookCategories();

	//SEO
	const title = catname + ' Bücher | cdl-protokolle.com';
	// Erstelle die Meta-Beschreibung basierend auf der Kategoriebeschreibung oder einem Standardtext
	const metaDescription = await getCategoryDescription(parseInt(catid));

	const data = { catid, catname, bookcategories, title, metaDescription };
	return {
		data,
		streamed: {
			books: getBooksFromCategory(parseInt(catid))
		}
	};
}
