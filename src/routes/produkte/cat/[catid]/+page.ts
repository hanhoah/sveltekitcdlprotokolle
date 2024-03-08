import { supabase } from '$lib/supabaseClient.js';

export async function load({ params }) {
	// Hier lädst du alle Produkte aus deiner Datenquelle, z.B. einer API
	const catid = params.catid;
	const { data: products, error } = await supabase
		.from('productswithcategory')
		.select()
		.eq('category_id', catid)
		.order('name');
	const length = products?.length;

	return {
		catid,
		length,
		products
	};
}
