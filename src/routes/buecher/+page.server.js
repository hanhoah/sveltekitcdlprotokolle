import supabase from '$lib/supabaseClient';

export async function load({setHeaders}) {
	const title =
		'Buchempfehlungen. Wähle eine der Kategorien um schneller das passende Buch zu finden. ';
	// adding Browser Caching
	setHeaders({
		"cache-control": "max-age=3600"
	})
	const { data } = await supabase.from('books').select().eq('active', true).order('prio').limit(12);
	//const { bdata } = await supabase.from('books').select();
	return {
		title,
		streamed: {
			books: data
		}
	};
}
