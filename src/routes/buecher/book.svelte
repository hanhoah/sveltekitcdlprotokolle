<script>
	import { getImg } from '$lib/functions/getBookImg.ts';

	export let book = { id: 0, img: '', title: '', slug: '' };
	// console.log('Book Komponenten Ausgabe ******************  book id ist ', book.id);
	// console.log(typeof(book.id));
</script>

<a href={`/buecher/${book.slug}`}>
	<div class="card bg-base-100 w-72 shadow-xl">
		<figure>
			<img src={getImg(book.img, book.id, 'books')} alt={book.title} />
		</figure>
		<div class="card-body">
			<h2 class="card-title">
				{book.title}
			</h2>
		</div>
	</div>
</a>
