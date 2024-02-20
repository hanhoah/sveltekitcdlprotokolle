import { supabase } from '$lib/supabaseClient';

/**
 * @param {number} bookId
 */
export async function getBookDetails(bookId) {
	// console.log('function getBookDetails', bookId);
	try {
		// Buchdaten abrufen
		const { data } = await supabase.from('books').select('*').eq('id', bookId).limit(1).single();

		// Die Buchdaten und die dazugehörigen Hashtags zurückgeben
		return { data };
	} catch (error) {
		// console.error(error);
		return {};
	}
}
