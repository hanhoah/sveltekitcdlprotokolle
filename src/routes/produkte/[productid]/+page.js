import supabase from '$lib/supabaseClient.js';

export async function load({ params }) {
	let pid = params.productid;
	let select = `id, name, img, description, link, products_categories(category_id), slug`;
	let { data } = await supabase.from('products').select(select).eq('slug', pid).limit(1).single();
	console.log('data ist ', data );

	let name = data.name;
	console.log('product: ', name, 'id: ', pid);

	//SEO
	const title = name;
	// Erstelle die Meta-Beschreibung basierend auf der Kategoriebeschreibung oder einem Standardtext
	const metaDescription =
		data.description || `Entdecken Sie eine Vielzahl von Produkten auf cdl-protokolle.com`;

	async function getSearchTerm(name) {
		let tempArray = name.split(' ');
		// für ein gutes Ergebnis bei der Amazon und Ebay Suche werden nur die ersten 3 Wörter von name genutzt
		tempArray = tempArray.slice(0, 3);
		let searchTerm = tempArray.join(' ');
		// console.log('Ausgabe function getSearchTerm(name): ', searchTerm);
		return searchTerm;
	}

	let searchterm = await getSearchTerm(name);

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

	// badgestring
	const badgestring = data.img
	console.log('badgestring from server, ', badgestring);

	return {
		data,
		badgestring,
		searchterm,
		streamed: {
			similarProducts: getProductsFromIds(spids)
		}
	};
}
