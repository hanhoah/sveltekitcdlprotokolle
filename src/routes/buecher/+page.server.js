import supabase from '$lib/supabaseClient';
import { kv } from '@vercel/kv';

async function getData(){
	const cached = await kv.get("bookindex")
	if (cached){
		console.log('cache bookindex found');
		return cached
	}
	console.log('cache bookindex not found');
	const { data } = await supabase.from('books').select().eq('active', true).order('prio').limit(30);
	if (data !== null && typeof data !== 'undefined') {
		kv.set("bookindex", JSON.stringify(data))
        return data;
    } else {
        return [];
    }
}

export async function load() {
	const title = 'Buchempfehlungen. Wähle eine der Kategorien um schneller das passende Buch zu finden. ';

	const data = getData();

	//const { bdata } = await supabase.from('books').select();
	return {
		title,
		streamed: {
			books: data
		}
	};
}
