import { getProductsByName } from '$lib/functions/products.ts';
import {getHashtag} from '$lib/functions/getHashtags.ts';

export async function load({ params }) {
	console.log('hashtags:');
	console.log('**********');
	let products = [];
	// Hier lädst du alle Produkte aus deiner Datenquelle, z.B. einer API

	const hashtagid = params.tag;
	const {tag: hashtag} = await getHashtag(hashtagid)
	console.log('hastag id ', hashtagid);
	console.log('hashtag ', hashtag);

	products = await getProductsByName(hashtag);

	const length = products?.length;

	return {
		hashtag,
		length,
		products
	};
}
