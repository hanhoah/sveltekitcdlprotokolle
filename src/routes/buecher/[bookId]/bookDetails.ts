import supabase from '$lib/supabaseClient';

export async function getBookDetails(slug: string) {
	console.log('function getBookDetails', slug);
	try {
		// Buchdaten abrufen
		const { data } = await supabase.from('books').select().eq('slug', slug).limit(1).single();
		// console.log('bookdetails data ergebnis ist ', data);

		// Die Buchdaten und die dazugehörigen Hashtags zurückgeben
		return { data };
	} catch (error) {
		// console.error(error);
		return {};
	}
}

export async function getBooklinks(bookid: number) {
	try {
		// links holen
		const { data } = await supabase.from('booklinks').select('label, link').eq('book_id', bookid);
		
		return data;
	} catch (error) {
		return {};
	}
}
