export function getImg(filename: string, id: number, folder: string) {
	let img = '';
	const path = `/images/${folder}/`;
	if (!filename) img = path + 'no_cover.jpeg';
	else img = path + id + '/' + filename;

	return img;
}
