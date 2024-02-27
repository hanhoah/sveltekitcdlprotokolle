import { supabase } from '$lib/supabaseClient';

export async function load() {
	const title =
		'Produktempfehlungen. Wähle eine der Kategorien um schneller das passende Produkt zu finden. ';
	const { data } = await supabase.from('products').select();
	return {
		title,
		streamed: {
			products: data
		}
	};
}
