import supabase from '$lib/supabaseClient';

export async function load() {
	const title =
		'Buchempfehlungen. Wähle eine der Kategorien um schneller das passende Buch zu finden. ';
	const { data } = await supabase.from('books').select().eq('active', true);
	//const { bdata } = await supabase.from('books').select();
	return {
		title,
		streamed: {
			books: data
		}
	};
}
