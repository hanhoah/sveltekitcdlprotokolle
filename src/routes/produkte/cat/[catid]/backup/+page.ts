import { getCategoryDescription } from '$lib/functions/categories.js';
import {
	getProductIdsFromCatId,
	getProductsFromIds,
	getProductsFromIdsWithPagination,
	getCategories,
	getCategoryNameById,
	countProductsByCategory
} from '$lib/functions/products.ts';

async function fetchProducts(catid: number, paginate: boolean) {
	if (paginate) {
		const productIds = await getProductIdsFromCatId(catid);
		return getProductsFromIdsWithPagination(productIds, 1, 50); // Beispielwerte für die Seitennummer und Seitengröße
	} else {
		return getProductsFromIds(await getProductIdsFromCatId(catid));
	}
}

export async function load({ params }) {
	const catid = params.catid;
	const productIds = await getProductIdsFromCatId(parseInt(catid));
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

	const products = await fetchProducts(parseInt(catid), paginate);

	const data = {
		catid,
		catname,
		productcategories,
		productQty,
		description,
		title,
		metaDescription
	};
	return {
		data,
		streamed: {
			products
		}
	};
}
