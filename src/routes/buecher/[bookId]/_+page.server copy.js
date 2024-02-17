import { supabase } from '$lib/supabaseClient';

export async function load(params) {
	const id = params.params.bookId;

	//fetching book data
	const { data } = await supabase.from('books').select().eq('id', id).limit(1).single();

	// 	const { data, error } = await supabase.from('users').select(`
	//   name,
	//   teams (
	// 	name
	//   )
	// `);

	// const { data } = await supabase
	// 	.from('books')
	// 	.select(`id, title, img, link, desc, hashtags(tag) `)
	// 	.eq('id', id)
	// 	.limit(1)
	// 	.single();
	console.log('book detail page', params.params);
	let bookdata = data;

	//fetching hashtags
	//let { data } = await supabase.from('HashtagBookRelation').select().eq('id', 20);
	// let { data } = await supabase.from('books').select().eq('active', true);
	// console.log('hashtags', data);
	// hashdata = data;

	console.log('data', data);
	return {
		bookdata
	};
}
