import { getCategoryDescription, getCategoryNameById } from '$lib/functions/categories.js';
import supabase from '$lib/supabaseClient.js';

// This can be false if you're using a fallback (i.e. SPA mode)
export const prerender = 'false';

export async function load({ params }) {
	// Hier lädst du alle Produkte aus deiner Datenquelle, z.B. einer API
	const catid = params.catid;
	console.log('Lade Cat Parameter ...', catid);

	const category = await getCategoryNameById(parseInt(catid));
	const description = await getCategoryDescription(parseInt(catid));

	console.log('desc', description);
	const { data: products, error } = await supabase
		.from('productwithpricecategories')
		.select()
		.eq('category_id', catid)
		.order('name');
	const length = products?.length;

	return {
		catid,
		length,
		category,
		description,
		products, 
	};
}
