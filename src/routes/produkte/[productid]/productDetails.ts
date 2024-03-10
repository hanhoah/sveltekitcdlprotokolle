import supabase from '$lib/supabaseClient';

export async function getProductDetails(pid: string) {
	// console.log('function getBookDetails', bookId);
	try {
		// Produktdaten abrufen
		const { data } = await supabase.from('products').select('*').eq('id', pid).limit(1).single();
		console.log('data ist ', data);

		// Die Buchdaten und die dazugehörigen Hashtags zurückgeben
		return { data };
	} catch (error) {
		// console.error(error);
		return {};
	}
}
