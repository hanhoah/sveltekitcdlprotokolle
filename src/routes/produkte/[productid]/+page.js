import { getProductDetails } from './productDetails.ts';

export async function load({ params }) {
	let pid = params.productid;

	let { data } = await getProductDetails(pid);

	return {
		data
	};
}
