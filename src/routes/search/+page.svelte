<script lang="ts">
	import Product from '../produkte/product.svelte';

	export let data;
	$: books = data.books;
	$: qtyBooks = data.books.length;
	$: products = data.products;
	$: qtyProducts = data.products.length;
	$: samples = data.samples;
	$: qtySamples = data.samples.length;
	$: videos = data.videos;
	$: qtyVideos = data.videos.length;
	$: posts = data.posts;
	console.log('posts from search are: ', posts);
	$: qtyPosts = data.articles.length;
	$: q = data.q;
	import Book from '../buecher/book.svelte';

	import { RESULTLIMIT } from '$lib/config.js';

	console.log('Suche nach: ', q);

	function getPerformanceNotice() {
		let html = '';
		if (qtyBooks == RESULTLIMIT)
			html += `<div class=\"<bg-red-300 px-2\">Hinweis: Aus Performance Gründen werden Suchergebnisse auf ${RESULTLIMIT} Ergebnisse limitiert. Falls Sie das passende Buch nicht finden, verfeinern Sie Ihre Suche mit einem weiteren Begriff.</div>`;
		if (qtyProducts == RESULTLIMIT)
			html += `<div class=\"<bg-blue-300 px-2\">Hinweis: Aus Performance Gründen werden Suchergebnisse auf ${RESULTLIMIT} Ergebnisse limitiert. Falls Sie das passende Produkt nicht finden, verfeinern Sie Ihre Suche mit einem weiteren Begriff.</div>`;
		if (qtySamples == RESULTLIMIT)
			html += `<div class=\"bg-green-300 px-2\">Hinweis: Aus Performance Gründen werden Suchergebnisse auf ${RESULTLIMIT} Ergebnisse limitiert. Falls Sie die passende Information nicht finden, verfeinern Sie Ihre Suche mit einem weiteren Begriff.</div>`;
		if (qtyVideos == RESULTLIMIT)
			html += `<div class=\"bg-yellow-300 px-2\">Hinweis: Aus Performance Gründen werden Suchergebnisse auf ${RESULTLIMIT} Ergebnisse limitiert. Falls Sie die passende Video nicht finden, verfeinern Sie Ihre Suche mit einem weiteren Begriff.</div>`;
		if (qtyPosts == RESULTLIMIT)
			html += `<div class=\"bg-lime-300 px-2\">Hinweis: Aus Performance Gründen werden Suchergebnisse auf ${RESULTLIMIT} Ergebnisse limitiert. Falls Sie den passenden Artikel nicht finden, verfeinern Sie Ihre Suche mit einem weiteren Begriff.</div>`;
		return html;
	}
</script>

<div id="start" class="p-2 mt-5 border-2">
	<div class="mb-5">
		Zu Ihrer Suche nach
		<span class="bg-yellow-200 px-2">
			{q}
		</span>

		wurden
		{#if qtyBooks > 0}
			<span class="books">
				<a href="#books">{qtyBooks} Bücher </a>
			</span>
		{/if}
		{#if qtyProducts > 0}
			<span class="products">
				<a href="#products">{qtyProducts} Produkte </a>
			</span>
		{/if}
		{#if qtySamples > 0}
			<span class="samples">
				<a href="#samples">{qtySamples} Informationen aus Leseproben </a>
			</span>
		{/if}
		{#if qtyVideos > 0}
			<span class="videos">
				<a href="#videos">{qtyVideos} Videos </a>
			</span>
		{/if}
		{#if qtyPosts > 0}
			<span class="posts">
				<a href="#posts">{qtyPosts} Artikel </a>
			</span>
		{/if}
		gefunden.
	</div>

	<div>
		Wir empfehlen Ihnen die Ergebnisse in einem neuen Tab zu öffnen, damit das Suchergebnis bestehen
		bleibt.
	</div>
	<div class="md:hidden">Wenn Sie ein Smartphone benutzen einfach einen Link gedrückt halten.</div>
	<div class="hidden md:block">
		Wenn Sie ein PC benutzen: 1. Rechts klick 2. Link in neuem Tab öffnen.
	</div>

	{@html getPerformanceNotice()}

	{#if qtySamples > 0}
		<div id="samples" class="samples w-full text-center my-5">
			<h2>Ergebnisse Informationen aus Leseproben:</h2>
		</div>
		<ul class="grid grid-cols-2 md:grid-cols-3">
			{#each samples as sample}
				<a href="/leseproben/{sample.slug}">
					<div class="hover:bg-blue-800 hover:text-white border-2 m-2 p-2 hlink">
						{sample.id}
					</div>
				</a>
			{/each}
		</ul>
	{/if}

	{#if qtyBooks > 0}
		<div id="books" class="books w-full text-center my-5"><h2>Ergebnisse Bücher:</h2></div>
		<ul class="grid grid-cols-2 md:grid-cols-3">
			{#each books as book}
				<li class="my-2">
					<Book book={{ slug: book.slug, id: book.id, title: book.title, img: book.img }} />
				</li>
			{/each}
		</ul>
	{/if}

	{#if qtyProducts > 0}
		<div id="products" class="products w-full text-center my-5"><h2>Ergebnisse Produkte:</h2></div>
		<ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
			{#each products as product}
				<div class="">
					<li class="my-5 py-5 relative">
						<Product
							product={{
								id: product.id,
								name: product.name,
								img: product.img,
								price: product.price,
								slug: product.slug
							}}
						/>
					</li>
				</div>
			{/each}
		</ul>
	{/if}

	{#if qtyVideos > 0}
		<div id="videos" class="videos w-full text-center my-5"><h2>Ergebnisse Videos:</h2></div>
		<ul class="grid grid-cols-2 md:grid-cols-3">
			{#each videos as video}
				<div class="">
					<li class="my-5 py-5 relative">
						{@html video.embed}
					</li>
				</div>
			{/each}
		</ul>
	{/if}

	{#if qtyPosts > 0}
		<div id="posts" class="posts w-full text-center my-5"><h2>Ergebnisse Artikel:</h2></div>

		{@html posts}
	{/if}

	<div class="mt-10">
		<h2>Nicht das passende hier gefunden? Versuchen Sie es mit Amazon oder Ebay</h2>
		<p>Ihren Suchtext haben wir bereits für Sie im Link eingebaut.</p>
		<div class="my-5 pb-10 flex flex-col items-center space-y-5">
			<a
				href="https://www.amazon.de/gp/search?ie=UTF8&tag=jumex_online-21&linkCode=ur2&linkId=470bf27aa1feb315de9cb5f18b114f2f&camp=1638&creative=6742&index=books&keywords={q}"
				target="_blank"
			>
				<div class="text-lg mt-3" color="light">
					<img alt="amazon logo" width="100" src="/images/logos/Amazon.de-Logo.svg.png" />
				</div>
			</a>

			<a
				href="https://www.ebay.de/sch/i.html?_from=R40&_trksid=p4432023.m570.l1313&_nkw={q}&_sacat=0"
				target="_blank"
			>
				<div class="text-lg mt-3" color="light">
					<img alt="ebay logo" width="100" src="/images/logos/EBay_logo.png" />
				</div>
			</a>
		</div>
	</div>
</div>

<style>
	.books {
		@apply bg-red-300 px-2;
	}
	.products {
		@apply bg-blue-300 px-2;
	}
	.samples {
		@apply bg-green-300 px-2;
	}
	.videos {
		@apply bg-yellow-300 px-2;
	}
	.posts {
		@apply bg-lime-300 px-2;
	}
</style>
