export function getImg(filename: string, id: number) {
	let img = '';
	const path = '/src/lib/images/books/';
	if (!filename) img = path + 'no_cover.jpeg';
	else img = path + id + '/' + filename;

	return img;
}
