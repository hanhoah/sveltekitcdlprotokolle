export function getProductImg(filename: string) {
	let img = '';
	const path = `/images/products`;
	if (!filename) img = path + 'no_cover.jpeg';
	else img = path + filename;

	return img;
}
