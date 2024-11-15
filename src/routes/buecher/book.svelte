<script>
	import { getImg } from '$lib/functions/getBookImg.ts';

	export let book = { id: 0, img: '', title: '', slug: '' };
	// console.log('Book Komponenten Ausgabe ******************  book id ist ', book.id);
	// console.log(typeof(book.id));
</script>

<div class=" w-full h-[300px]">
	<div class=" pt-2 overflow-auto">
		<a href={`/buecher/${book.slug}`}>
			<img class="mx-auto" width="150" src={getImg(book.img, book.id, 'books')} alt={book.title} />
		</a>
		<div class="p-3">
			<a href={`/buecher/${book.id}`}>
				{book.title}
			</a>
		</div>
	</div>
</div>
