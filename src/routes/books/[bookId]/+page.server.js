import { supabase } from '$lib/supabaseClient';

export async function load(params) {
	const id = params.params.bookId;
	const { data } = await supabase.from('books').select().eq('id', id).limit(1).single();
	console.log('params from server', params.params);

	// console.log('data from server', data);
	return {
		data
	};
}
