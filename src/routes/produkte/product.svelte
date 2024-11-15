<script lang="ts">
	import { getProductImg } from '$lib/functions/getProductImg';
	import type { Product } from '$lib/types/product';
	import { getBadge } from '$lib/functions/shops.ts';
	export let product: Product;
</script>

<a href={`/produkte/${product.slug}`}>
	<div class="card bg-base-100 w-72 shadow-xl">
		<figure>
			<img src={getProductImg(product.img) || '/images/products/no_cover.jpeg'} alt="Shoes" />
		</figure>
		<div class="card-body">
			<h2 class="card-title">
				{product.name}
				{@html getBadge(product.img)}
			</h2>
			<p class="p-3 text-lg font-bold text-center">
				{new Intl.NumberFormat('de-DE', {
					style: 'currency',
					currency: 'EUR'
				}).format(product.price)}
			</p>
		</div>
	</div>
</a>
