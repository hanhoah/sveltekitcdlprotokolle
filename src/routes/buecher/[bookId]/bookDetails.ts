import supabase from '$lib/supabaseClient';

function isDigit(slug){
	return /^\d+$/.test(slug)
}

export async function getBookDetails(slug: string) {
	try {
		let sid = "id"
		if(!isDigit(slug))
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
