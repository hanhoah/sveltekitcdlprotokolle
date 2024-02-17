import { supabase } from '$lib/supabaseClient';

export async function load() {
	const title = 'Bücher der alternativen Medizin';
	const { data } = await supabase.from('books').select().eq('active', true);
	//const { bdata } = await supabase.from('books').select();
	return {
		title,
		books: data ?? []
	};
}
