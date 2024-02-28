import { supabase } from '$lib/supabaseClient.js';

export async function load({ params }) {
	let pid = params.productid;
	let select = `name, image, description, link, products_categories(category_id)`;
	let { data } = await supabase.from('products').select(select).eq('id', pid).limit(1).single();

	// get Similar Products
	// Kategorie Id
	let kid = data.products_categories[0].category_id;

	async function getSimilarProductIds(kid, pid) {
		let { data } = await supabase
			.from('products_categories')
			.select('product_id')
			.eq('category_id', kid)
			.range(0, 9);

		let similarProducts = data.map((obj) => obj.product_id);

		similarProducts = similarProducts.filter((product) => product != pid);

		return similarProducts;
	}

	async function getProductsFromIds(spids) {
		let { data } = await supabase.from('products').select().in('id', spids);
		return data;
	}

	// spids = similar product ids
	let spids = await getSimilarProductIds(kid, pid);

	return {
		data,
		streamed: {
			similarProducts: getProductsFromIds(spids)
		}
	};
}
