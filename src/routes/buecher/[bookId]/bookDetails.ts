import supabase from '$lib/supabaseClient';

export async function getBookDetails(slug: string) {
	try {
		let sid = "id"
		// if the parameter is longer then 4 characters it is considered to be a slug, otherwise it is an id (by default)
		if(slug.length>4)
			sid = "slug"
		const { data } = await supabase.from('books').select().eq(sid, slug).limit(1).single();
		return { data };
	} catch (error) {
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
