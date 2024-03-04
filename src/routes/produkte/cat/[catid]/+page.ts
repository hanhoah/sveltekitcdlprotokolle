import {
	getProductIdsFromCatId,
	getProductsFromIds,
	getCategories,
	getCategoryNameById,
	countProductsByCategory
} from '$lib/functions/products.ts';

export async function load({ params }) {
	const catid = params.catid;
	const productIds = await getProductIdsFromCatId(parseInt(catid));
	const productQty = await countProductsByCategory(parseInt(catid));
	const catname = await getCategoryNameById(parseInt(catid));
	const productcategories = getCategories();

	const data = { catid, catname, productcategories, productQty };
	return {
		data,
		streamed: {
			products: getProductsFromIds(productIds)
		}
	};
}
