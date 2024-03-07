// URL Parameter Pagination erfordert, dass diese seite nicht geprerendered werden kann
export const prerender = false;

import { getCategoryDescription } from '$lib/functions/categories.js';
import {
	getCategories,
	getCategoryNameById,
	getProductsByCategoryId,
	countProductsByCategory,
	getProductsByCategoryIdWithPagination
} from '$lib/functions/products.ts';

async function fetchProducts(catid: number, paginate: boolean, page: number) {
	if (paginate) {
		return getProductsByCategoryIdWithPagination(catid, page, 50); // Seitennummer und Seitengröße
	} else {
		return getProductsByCategoryId(catid);
	}
}

export async function load({ params, url }) {
	const page = url.searchParams.get('page') || 1; // Standardmäßig Seite 1 laden
	const catid = params.catid;

	const productQty = await countProductsByCategory(parseInt(catid));
	const catname = await getCategoryNameById(parseInt(catid));
	const productcategories = getCategories();
	const description = await getCategoryDescription(parseInt(catid));

	//SEO
	const title = `${catname} - CDL Protokolle`;
	// Erstelle die Meta-Beschreibung basierend auf der Kategoriebeschreibung oder einem Standardtext
	const metaDescription =
		description ||
		`Entdecken Sie eine Vielzahl von Produkten in der Kategorie ${catname} auf CDL Protokolle.`;

	const paginate = productQty > 50; // Bestimme, ob Pagination erforderlich ist

	const products = await fetchProducts(parseInt(catid), paginate, page);

	const data = {
		catid,
		catname,
		productcategories,
		productQty,
		description,
		title,
		metaDescription,
		page
	};
	return {
		data,
		streamed: {
			products
		}
	};
}
