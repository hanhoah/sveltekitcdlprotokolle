import { getCategoryDescription, getCategoryNameById } from '$lib/functions/categories.js';
import supabase from '$lib/supabaseClient.js';

export async function load({ params }) {
	// Hier lädst du alle Produkte aus deiner Datenquelle, z.B. einer API
	const catid = params.catid;
	const category = await getCategoryNameById(parseInt(catid));
	const description = await getCategoryDescription(parseInt(catid));

	console.log('desc', description);
	const { data: products, error } = await supabase
		.from('productswithcategory')
		.select()
		.eq('category_id', catid)
		.order('name');
	const length = products?.length;

	return {
		catid,
		length,
		category,
		description,
		products
	};
}
