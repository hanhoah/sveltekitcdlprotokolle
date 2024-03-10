export const prerender = false;
import supabase from '$lib/supabaseClient.js';

async function getBooks(q: string) {
	const { data } = await supabase.from('books').select().textSearch('title', q);
	// const { data } = await supabase.from('books').select('id, title').eq('id', 4);
	return data;
}

async function getProducts(q: string) {
	const { data } = await supabase.from('products').select().textSearch('name', q);
	// const { data } = await supabase.from('books').select('id, title').eq('id', 4);
	return data;
}

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const q = formData.get('search');
		const books = await getBooks(q);
		const products = await getProducts(q);
		return { q, books, products };
	}
};
